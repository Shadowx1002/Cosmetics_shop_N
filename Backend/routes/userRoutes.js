import express from "express";
import {
  getUsers,
  createUser,
  loginUser,
  toggleBlockUser,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.post("/", createUser);
userRouter.post("/login", loginUser);
userRouter.patch("/:id/toggle-block", toggleBlockUser); // ✅ block/unblock user

export default userRouter;
