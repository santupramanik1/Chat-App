import express from "express";
// import { getAllUser, getUser, loginUser, myProfile, updateUserName, verifyUser } from "../controllers/userController.js";
import { isAuth } from "../middleware/isAuth.js";
import { getAllUsers, getAUser, loginUser, myProfile, updateUserName, verifyUser } from "../controllers/userController.js";
const router = express.Router()


router.post("/login", loginUser)
router.post("/verify", verifyUser)
router.get("/me", isAuth, myProfile)
router.get("/user/all", isAuth, getAllUsers)
router.get("/user/:id", getAUser)
router.post("/update/user", isAuth, updateUserName)
export default router