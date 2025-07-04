## RabbitMQ Connection Document
### connectRabbitMQ
- The connectRabbitMQ function asynchronously connects to a RabbitMQ server and creates a channel for message delivery. It uses environment variables for configuration and logs the connection status.

### Arguments

The function does not take any arguments. It relies on the following environment variables:

- `Rabbitmq_HOST`: The hostname of the RabbitMQ server.

- `Rabbitmq_Username`: The username for authenticating with the RabbitMQ server. 

- `Rabbitmq_Password`: The password for authenticating with the RabbitMQ server.

#### Returns
Type: Promise<void>

#### Description: 
- The function returns a promise that resolves when the connection and channel are successfully established. If the connection fails, it logs an error message and does not throw an exception.

## publishMessageToQueue
- This function is used to publish or send a message to a specific RabbitMQ queue.

### Parameters:

- queueName (string): The name of the queue where the message should be sent.

- message (any): The actual message/data to be sent to the queue. This is typically a JavaScript object or any serializable data.

### Behavior:

- The function first checks if the RabbitMQ channel is properly established.

- If the channel is not defined or is unavailable, it logs a warning: "Rabbitmq channel is not defined !" and exits without sending the message.

#### If the channel exists:

- It asserts the queue using the provided queueName. The durable: true option ensures that the queue persists through RabbitMQ server restarts or crashes.

- It then sends the message to the specified queue. The message is first converted into a JSON string, then into a Buffer (required by RabbitMQ).

- The message is sent with { persistent: true } to ensure the message is not lost even if RabbitMQ restarts.