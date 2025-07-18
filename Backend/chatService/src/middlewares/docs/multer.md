- You're initializing a CloudinaryStorage instance for use with multer to handle file uploads.

- The params object contains instructions like:

- `folder`: Where to store the image on Cloudinary.

- `allowed_format`: Which formats are accepted.

- `transformation:` Resize and optimize images.

## ⚙️ How It Works

1. User uploads an image via an HTTP POST request.
2. Multer uses `CloudinaryStorage` to send the image to Cloudinary.
3. The image is:
   - Stored in the `chat-images` folder in Cloudinary.
   - Automatically resized to max 800×800 pixels.
   - Optimized for quality.
4. Only image files are allowed (`jpg`, `jpeg`, `png`, `gif`, `webp`).
5. File size must be under **5 MB**.