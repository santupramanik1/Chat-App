import express from "express"
import { isAuth } from "../middlewares/isAuthenticated.js"
import { createNewChat, getAllChat, sendMessages } from "../controller/chatController.js"
import { upload } from "../middlewares/multer.js"
const router = express.Router()

router.post("/chat/new", isAuth, createNewChat)

// GET ALL THE CHAT OF THE SPECIFIC USER
router.get("/chat/all", isAuth, getAllChat)

// UPLOAD THE IMAGES IN CLOUDINARY
router.post("/message", isAuth, upload.single('image'), sendMessages)


export default router