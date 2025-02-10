const express = require("express");
const {
  registerClient,
  loginClient,
} = require("../controllers/clientController");
const router = express.Router();

// Register a new client
router.post("/register", registerClient);

// Login client
router.post("/login", loginClient);

module.exports = router;
