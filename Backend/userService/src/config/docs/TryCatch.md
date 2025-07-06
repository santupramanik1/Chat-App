## TryCatch :
- TryCatch` is a helper function for Express.js.  
It **wraps your route handlers** so that if something goes wrong (like a database error or a bug), it catches the error and sends a clean message to the user — instead of crashing the whole app.

- It used to avoid repeation of Define try-catch in every time of every controller for error handling.

### Parameter:
- handler: This is a function in your Express.js app that handles a web request (like a route handler or middleware). It’s the code you want to protect from errors. The handler function typically expects three 
####  arguments:
- `req (Request)`: Contains details about the user’s request, like form data or URL parameters.

- `res (Response):` Used to send a response back to the user, like a webpage or JSON data.

- `next (NextFunction):` A function to pass control to the next piece of code in your app.
