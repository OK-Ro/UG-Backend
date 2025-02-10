const Client = require("../models/Client");
const {
  generateUniqueCode,
  generatePostcode,
} = require("../utils/uniqueCodeGenerator"); // Import both functions
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register a new client
exports.registerClient = async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      nationalId,
      nationalIdFront,
      nationalIdBack,
      district,
      town,
      password,
    } = req.body;

    // Generate postcode and unique code
    const postcode = generatePostcode(district); // Use generatePostcode
    const uniqueCode = generateUniqueCode(district, town); // Use generateUniqueCode

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create client
    const client = new Client({
      name,
      phone,
      email,
      nationalId,
      nationalIdFront,
      nationalIdBack,
      district,
      town,
      postcode,
      uniqueCode,
      password: hashedPassword,
    });

    await client.save();
    res.status(201).json({ message: "Client registered successfully", client });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login client
exports.loginClient = async (req, res) => {
  try {
    const { phone, password } = req.body;

    // Find client by phone
    const client = await Client.findOne({ phone });
    if (!client)
      return res.status(400).json({ error: "Invalid phone or password" });

    // Check password
    const isMatch = await bcrypt.compare(password, client.password);
    if (!isMatch)
      return res.status(400).json({ error: "Invalid phone or password" });

    // Generate JWT
    const token = jwt.sign({ clientId: client._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ message: "Client login successful", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
