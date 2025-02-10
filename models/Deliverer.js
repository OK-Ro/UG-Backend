const mongoose = require("mongoose");

const delivererSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  email: { type: String, unique: true },
  nationalId: { type: String, required: true, unique: true },
  vehicleType: { type: String, required: true }, // e.g., bike, car
  licensePlate: { type: String, required: true }, // Vehicle license plate
  password: { type: String, required: true },
  role: { type: String, default: "deliverer" },
});

module.exports = mongoose.model("Deliverer", delivererSchema);
