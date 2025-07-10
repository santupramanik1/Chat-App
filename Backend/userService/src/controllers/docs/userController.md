## Login :
- Visual Example Over Time
Let’s see how the bucket changes for user123 over multiple requests:

- `10:00:00 AM:` User requests OTP. Bucket is new: `count = 5`, `lastRefill = 1625098760.` `Use 1 token → count = 4.`

- `10:00:20 AM:` User requests again. timePassed = 20 seconds. Refill 1 token. `count = 4 + 1 = 5` (capped at 5). Use 1 token → count = 4. `Set lastRefill = 1625098780.`

- `10:00:30 AM:` User requests again. timePassed = 10 seconds. Refill 0 tokens (since 10/12 = 0.833). `count = 4 + 0 = 4. Use 1 token → count = 3.`

- `10:01:00 AM:` User requests again. timePassed = 30 seconds. Refill 2 tokens (30/12 = 2.5 → 2). count = 3 + 2 = 5 (capped at 5). Use 1 token → count = 4.


## verifyUser – Verify OTP and Authenticate User
The verifyUser function handles OTP (One-Time Password) verification for user login or signup. It validates the OTP sent to the user's email, verifies the user, and issues a JWT token if successful.

### What It Takes (Request Body):
```js
{
  "email": "user@example.com",
  "otp": "123456"
}
```


### ⚙️ What It Does:
#### Validates Input:
- Checks if both email and otp are present in the request.

- If not, returns a 400 error: "Email or Otp is required".

#### Fetches OTP from Redis:
- Looks up the OTP stored in Redis using the key format otp:<email>.

#### Compares OTPs:

- If the stored OTP does not match the one provided by the user, returns a 400 error: "Invalid or Expired otp".

#### Deletes OTP from Redis:

- Removes the OTP from Redis after successful validation.

#### Finds or Creates User in MongoDB:

- Searches for a user with the given email.

- If not found, creates a new user with:

- name = first 8 characters of email

- email = provided email

#### Generates JWT Token:

- Calls generateToken(user) to create a signed token.