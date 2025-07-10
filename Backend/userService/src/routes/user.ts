import  express  from "express";
import { loginUser,verifyUser } from "../controllers/userController.js";
const router=express.Router()

console.log("✅ user.js routes loaded"); // Add this line

router.post("/login",loginUser)

router.post("/verify",verifyUser)

export default router