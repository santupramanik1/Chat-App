## consumeOtpFromQueue
- The consumeOtpFromQueue function establishes a connection to a RabbitMQ message broker, listens for OTP messages in a specified queue, and sends emails containing the OTP details to recipients using Nodemailer. 

### Parameters:

- The consumeOtpFromQueue function takes no parameters. It relies on environment variables for configuration:


- `Rabbitmq_HOST`: The hostname of the RabbitMQ server.

- `Rabbitmq_Username`: The username for RabbitMQ authentication.

- `Rabbitmq_Password`: The password for RabbitMQ authentication.

- `USER:` The Gmail account used for sending emails.

- `PASSWORD:` The Gmail account password .

### The function also expects messages in the send-otp queue to contain a JSON object with the following fields:

- `to:` The recipient’s email address (string).

- s`ubject:` The email subject line (string).

- `body:` The email body content, typically the OTP (string).