## generateToken :
- This function is responsible for creating a JSON Web Token (JWT) for a user. This token can be used to authenticate the user in future requests (e.g., accessing protected routes).



### ⚙️ How It Works:
- Loads environment variables using dotenv.

- Gets the JWT secret key from .env:

- JWT_SECRET=your_secret_key
- Signs a JWT using the user data and secret key.

- Sets the token to expire in 7 days.

