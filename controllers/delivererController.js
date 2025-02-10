const Deliverer = require("../models/Deliverer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register a new deliverer
exports.registerDeliverer = async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      nationalId,
      vehicleType,
      licensePlate,
      password,
    } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create deliverer
    const deliverer = new Deliverer({
      name,
      phone,
      email,
      nationalId,
      vehicleType,
      licensePlate,
      password: hashedPassword,
    });

    await deliverer.save();
    res
      .status(201)
      .json({ message: "Deliverer registered successfully", deliverer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login deliverer
exports.loginDeliverer = async (req, res) => {
  try {
    const { phone, password } = req.body;

    // Find deliverer by phone
    const deliverer = await Deliverer.findOne({ phone });
    if (!deliverer)
      return res.status(400).json({ error: "Invalid phone or password" });

    // Check password
    const isMatch = await bcrypt.compare(password, deliverer.password);
    if (!isMatch)
      return res.status(400).json({ error: "Invalid phone or password" });

    // Generate JWT
    const token = jwt.sign(
      { delivererId: deliverer._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Deliverer login successful", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
