import express from "express";
import {
  getUsers,
  createUser,
  loginUser,
  toggleBlockUser,
  LoginWithGoogle,
  sendOtp,
  resetPassword,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.post("/", createUser);
userRouter.post("/login", loginUser);
userRouter.patch("/:id/toggle-block", toggleBlockUser); 
userRouter.post("/login/google" , LoginWithGoogle)
userRouter.post("/send-otp" , sendOtp)
userRouter.post("/reset-password" , resetPassword)


export default userRouter;
