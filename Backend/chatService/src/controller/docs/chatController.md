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