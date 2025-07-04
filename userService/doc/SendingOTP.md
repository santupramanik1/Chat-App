## How OTP is Sending to the Rabbitmq

### User Requests OTP:
- A user enters their email address in the app to request an OTP for login or verification.

### OTP Generation:
- The system generates a unique OTP (e.g., a 6-digit code, valid for 5 minutes).
- The OTP, user’s email, and expiration time are saved in a database (e.g., Redis or MongoDB).

### Queueing the Email Task:
- The system creates a message with the OTP and user’s email.
- This message is sent to a RabbitMQ queue (e.g., "otp_email_queue").

### Processing the Queue:
- Worker processes (separate programs) listen to the RabbitMQ queue.
- A worker picks up the message and extracts the OTP and email details.

### Sending the Email:
- The worker uses an email service (e.g., SendGrid or AWS SES) to send the OTP to the user.
- If the email service fails, RabbitMQ keeps the task in the queue for retries.

### User Submits OTP:
- The user receives the OTP via email and enters it into the app.

### OTP Verification:
- The system checks the database to verify the OTP matches and is still valid.
- If valid, the user is authenticated; if not, they’re prompted to try again.


