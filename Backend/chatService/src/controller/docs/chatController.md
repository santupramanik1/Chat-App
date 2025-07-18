## createNewChat
- createNewChat is an Express controller that handles the creation of 1-on-1 chat conversations between two users. It first checks if a chat already exists between the users, and only creates a new one if not.

### Extract User IDs:
- Retrieves the authenticated user’s ID from `req.user?._id.`
- Extracts otherUserId from req.body.



### Validate Input:

- Checks if otherUserId is provided. If not, returns a 400 response with an error message.

### Check for Existing Chat:

- Queries the Chat collection using Chat.findOne({ users: { $all: [userId, otherUserId], $size: 2 } }).


- The `$all` operator ensures both userId and otherUserId are in the users array.


- The `$size: 2` ensures the chat is one-on-one (exactly two users).


#### If a chat is found, returns a 200 response with the chat’s ID.


#### Create New Chat:

- Returns a 201 response with the new chat’s ID.

## 📩 getAllChat Function

### ✅ Purpose
The `getAllChat` function is an asynchronous Express route handler designed to retrieve all chat conversations for an authenticated user. Each chat includes:

- Details of the other participant (fetched from a user service).
- The most recent message (if available).
- The count of unseen (unread) messages from the other user.

Wrapped in a `TryCatch` utility for error handling, this function supports scalable and fault-tolerant chat retrieval in a messaging application.

---

### 📥 Parameters

| Parameter | Type                    | Description                                                  |
|-----------|-------------------------|--------------------------------------------------------------|
| `req`     | `AuthenticatedRequest`  | Express request object with user authentication (`req.user?._id`). |
| `res`     | `Response`              | Express response object used to send the final JSON output.  |

---

### 📤 Return Value

- **Status Code:** `200 OK`
- **Response Format:**

```json
{
  "chats": [
    {
      "user": {
        "_id": "otherUserId1",
        "name": "John Doe"
      },
      "chat": {
        "_id": "chatId1",
        "users": ["loggedInUserId", "otherUserId1"],
        "latestMessage": {
          // Latest message object or null
        },
        "unseenCount": 2,
        "updatedAt": "2025-07-18T23:10:00Z"
        // Other chat properties
      }
    },
    ...
  ]
}

Error (400):

{
  "message": "UserId is Missing"
}
``` 
##  Working of the Function:
### 🔐 User ID Validation

- Extracts userId from req.user?._id.

- If missing, responds with 400 Bad Request.

### 💬 Fetch Chats

- Uses Chat.find({ users: userId }) to retrieve all chats the user is involved in.

- Sorts results by updatedAt in descending order.

### 🔁 Process Each Chat Concurrently

- Iterates through all chats using Promise.all() to run operations in parallel.

### For each chat:

- Identifies the otherUserId by excluding userId from the users array.

- Counts unseen messages using Messages.countDocuments():

- chatId: current chat's ID.

- sender: not equal to current user.

- seen: false.

### Fetches user details of the other participant:

- Makes GET request to:
`${process.env.USER_SERVICE}/api/v1/user/${otherUserId}`

- If it fails, logs error and defaults to:

```json
{ "_id": "otherUserId", "name": "Unknown user" }
```
### Builds the response object:

- user: fetched or fallback user info.

- chat: full chat object + latestMessage + unseenCount.

### 📦 Return

Sends a JSON response with an array of all processed chat data.