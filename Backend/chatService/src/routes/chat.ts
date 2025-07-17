import express from "express"
import { isAuth } from "../middlewares/isAuthenticated.js"
import { createNewChat, getAllChat } from "../controller/chatController.js"
const router = express.Router()

router.post("/chat/new", isAuth, createNewChat)
router.get("/chat/all", isAuth, getAllChat)

export default router