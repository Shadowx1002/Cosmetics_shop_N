import express from "express";
import {
  getUserforadmin,
  createUser,
  loginUser,
  toggleBlockUser,
  LoginWithGoogle,
  sendOtp,
  resetPassword,
  getUsers,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/userdetailsa", getUserforadmin);
userRouter.post("/", createUser);
userRouter.post("/login", loginUser);
userRouter.patch("/:id/toggle-block", toggleBlockUser); 
userRouter.post("/login/google" , LoginWithGoogle)
userRouter.post("/send-otp" , sendOtp)
userRouter.post("/reset-password" , resetPassword)
userRouter.get("/" , getUsers)


export default userRouter;
