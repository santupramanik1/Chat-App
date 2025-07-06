## handleOtpRequest:
- Generate a 6-digit OTP for a user (identified by their email).

- Limit the number of OTP requests to 5 per minute using a token bucket system in Redis.

- Store the OTP and rate-limiting data in Redis with expiration times.

- Return a success message with the OTP or an error if the user has made too many requests.

- It ensures users don’t spam OTP requests (e.g., for account verification) by enforcing a rate limit.

- ⚙️ How It Works (Step-by-Step)
- Get the User’s Email: Takes the user’s email as input to identify them.

#### Check Rate Limit:
- Uses Redis to track how many OTP requests (tokens) the user has left (up to 5).

- Checks when the last OTP request was made to refill tokens over time (1 token every 12 seconds).

#### Refill Tokens if Needed:
- If enough time has passed, adds tokens back to the user’s “bucket” (but never more than 5).

- Updates the time of the last check.

#### Enforce Rate Limit:
- If no tokens are left, returns an error saying “Too many requests.”

- If tokens are available, uses 1 token and continues.

- Generate OTP: Creates a random 6-digit OTP (e.g., 483920).

- Store Data in Redis:

- Saves the updated token count and last refill time with a 60-second expiration.

- Saves the OTP with a 5-minute expiration.


