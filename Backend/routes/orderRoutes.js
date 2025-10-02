import express from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
} from "../controllers/orderController.js";

const router = express.Router();

// Routes
router.post("/", createOrder);              // Create new order
router.get("/", getOrders);                 // Get all orders
router.get("/:id", getOrderById);           // Get order by ID
router.put("/:id", updateOrderStatus);      // Update order status
router.delete("/:id", deleteOrder);         // Delete order

export default router;
