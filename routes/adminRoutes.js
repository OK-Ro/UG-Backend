const express = require("express");
const {
  registerAdmin,
  loginAdmin,
  getAllClients,
  getAllDeliverers,
} = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware"); // Import the middleware
const router = express.Router();

// Register admin (no authentication required)
router.post("/register", registerAdmin);

// Login admin (no authentication required)
router.post("/login", loginAdmin);

// Get all clients (protected route)
router.get("/clients", authMiddleware, getAllClients);

// Get all deliverers (protected route)
router.get("/deliverers", authMiddleware, getAllDeliverers);

module.exports = router;
