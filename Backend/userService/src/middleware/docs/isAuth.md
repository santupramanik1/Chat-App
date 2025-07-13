## 🔐 isAuth Middleware :
### ✅ Purpose
- The isAuth middleware is used to protect private routes in an Express.js application by verifying the user's JWT (JSON Web Token). It ensures that only authenticated users can access certain routes and makes the user data available on the request object.

#### 📥 Parameters


- ` req	AuthenticatedRequest (extends Request) :`	The incoming request object. Expects an Authorization header containing a valid JWT token.

- `res	Response :`	The outgoing response object. Used to return errors for unauthorized access.
- `next	NextFunction :`	A callback function to pass control to the next middleware or route handler.

#### 📤 Return :
This function returns void, but performs the following actions based on the presence and validity of the token:

- ✅ If the token is valid:

       1. Extracts the user data from the token.

       2. Attaches it to req.user.

       3. Calls next() to pass control to the next handler.

- ❌ If the token is missing or invalid:

        Returns a 401 Unauthorized response with an appropriate message.

