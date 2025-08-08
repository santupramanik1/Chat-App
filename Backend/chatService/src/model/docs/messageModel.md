## 🧾 Message Schema Fields

| **Field Name**   | **Type**                         | **Required** | **Default** | **Description**                                                                |
| ---------------- | -------------------------------- | ------------ | ----------- | ------------------------------------------------------------------------------ |
| `chatId`         | `ObjectId` (Reference)           | ✅ Yes        | —           | References the related `Chat` document (foreign key).                          |
| `sender`         | `String`                         | ✅ Yes        | —           | The ID of the user who sent the message.                                       |
| `text`           | `String`                         | ❌ No         | —           | The text content of the message (optional, used if message type is "text").    |
| `image.url`      | `String` (Nested)                | ❌ No         | —           | URL of the uploaded image (if message is an image).                            |
| `image.publicId` | `String` (Nested)                | ❌ No         | —           | Public ID of the image in Cloudinary or similar service.                       |
| `messageType`    | `String` (`"text"` or `"image"`) | ❌ No         | `"text"`    | Indicates whether the message is a text or image message.                      |
| `seen`           | `Boolean`                        | ❌ No         | `false`     | Marks whether the message has been seen.                                       |
| `seenAt`         | `Date`                           | ❌ No         | `null`      | The timestamp when the message was seen (if seen).                             |
| `createdAt`      | `Date` (auto-managed)            | —            | —           | Automatically added by `{ timestamps: true }` – creation time of the document. |
| `updatedAt`      | `Date` (auto-managed)            | —            | —           | Automatically updated on changes.                                              |
