## 👤 User API Endpoints

These endpoints handle user authentication and profile management.

---

### 📥 `POST /api/user/register`

**Description:**  
Handles **user signup** by creating a new user account.

**Request Body:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
Response:
{
  "message": "User registered successfully",
  "userId": "12345"
}
```

##
### 🔐 `POST /api/user/login`
Description:
Authenticates a user using email and password, and optionally triggers an OTP-based flow.

Request Body:
```js
{
  "email": "john@example.com",
  "password": "securePassword123"
}
Response:
{
  "message": "OTP sent to email",
  "token": null
}
```
After OTP is verified, a token is provided.

##
### 🙍 `GET /api/user/me`
Description:
Fetches the currently logged-in user's profile (requires authentication).

Headers:
Authorization: Bearer <JWT_TOKEN>
Response:
```js
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "bio": "Developer. Dreamer.",
  "profilePic": "https://example.com/images/john.jpg"
}
```
##
### `✏️ PUT /api/user/profile`
Description:
Updates user profile details such as name, bio, or profile picture.

Headers:
Authorization: Bearer <JWT_TOKEN>

Request Body:
```js
{
  "fullName": "Johnny D",
  "bio": "Full-stack Developer",
  "profilePic": "https://example.com/images/johnny.jpg"
}
Response:
{
  "message": "Profile updated successfully"
}
```