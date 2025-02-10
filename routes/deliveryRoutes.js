const express = require("express");
const {
  createDelivery,
  assignDelivery,
  updateDeliveryStatus,
  getAllDeliveries,
} = require("../controllers/deliveryController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Create a new delivery (protected route)
router.post("/", authMiddleware, createDelivery);

// Assign a delivery to a deliverer (protected route)
router.post("/assign", authMiddleware, assignDelivery);

// Update delivery status (protected route)
router.put("/status", authMiddleware, updateDeliveryStatus);

// Get all deliveries (protected route)
router.get("/", authMiddleware, getAllDeliveries);

module.exports = router;
