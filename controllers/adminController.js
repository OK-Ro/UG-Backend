const Admin = require("../models/Admin");
const Client = require("../models/Client");
const Deliverer = require("../models/Deliverer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register a new admin
exports.registerAdmin = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin
    const admin = new Admin({
      name,
      email,
      phone,
      username: email.split("@")[0], // Generate username from email
      password: hashedPassword,
    });

    await admin.save();
    res.status(201).json({ message: "Admin registered successfully", admin });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login admin
exports.loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find admin by username
    const admin = await Admin.findOne({ username });
    if (!admin)
      return res.status(400).json({ error: "Invalid username or password" });

    // Check password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.status(400).json({ error: "Invalid username or password" });

    // Generate JWT
    const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ message: "Admin login successful", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all clients
exports.getAllClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all deliverers
exports.getAllDeliverers = async (req, res) => {
  try {
    const deliverers = await Deliverer.find();
    res.json(deliverers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
