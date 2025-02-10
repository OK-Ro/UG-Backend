const express = require("express");
const {
  registerDeliverer,
  loginDeliverer,
} = require("../controllers/delivererController");
const router = express.Router();

// Register a new deliverer
router.post("/register", registerDeliverer);

// Login deliverer
router.post("/login", loginDeliverer);

module.exports = router;
