import express from "express";
import {
  addToCart,
  getCart,
  removeFromCart,
} from "../controllers/cartController.js";
import authMiddleware from "../middleware/auth.js";

const cartRouter = express.Router();

cartRouter.post("/api/get", authMiddleware, getCart);
cartRouter.post("/api/add", authMiddleware, addToCart);
cartRouter.post("/api/remove", authMiddleware, removeFromCart);

export default cartRouter;
