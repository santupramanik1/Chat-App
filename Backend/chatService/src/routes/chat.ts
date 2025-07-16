import express from "express"
import { isAuth } from "../middlewares/isAuthenticated.js"
import { createNewChat } from "../controller/chatController.js"
const router = express.Router()

router.post("/chat/new", isAuth, createNewChat)

export default router