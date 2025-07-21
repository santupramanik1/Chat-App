## 🧾 Chat Schema Fields

| **Field Name**         | **Type**                | **Required** | **Default** | **Description**                                       |
| ---------------------- | ----------------------- | ------------ | ----------- | ----------------------------------------------------- |
| `users`                | `Array<String>`         | ✅ Yes        | —           | List of user IDs participating in the chat.           |
| `latestMessage.text`   | `String`                | ❌ No         | —           | Text of the most recent message in the chat.          |
| `latestMessage.sender` | `String`                | ❌ No         | —           | ID of the user who sent the latest message.           |
| `createdAt`            | `Date` (auto-generated) | —            | —           | Timestamp of when the chat document was created.      |
| `updatedAt`            | `Date` (auto-generated) | —            | —           | Timestamp of when the chat document was last updated. |
