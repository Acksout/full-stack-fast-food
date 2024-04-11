import express from "express";
import { loginUser, registerUser } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/api/register", registerUser);
userRouter.post("/api/login", loginUser);

export default userRouter;
