const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  email: { type: String, unique: true },
  nationalId: { type: String, required: true, unique: true },
  nationalIdFront: { type: String, required: true }, // URL to front photo
  nationalIdBack: { type: String, required: true }, // URL to back photo
  district: { type: String, required: true },
  town: { type: String, required: true },
  postcode: { type: String, required: true }, // Generated based on district
  uniqueCode: { type: String, unique: true }, // Generated based on district and town
  password: { type: String, required: true },
  role: { type: String, default: "client" },
});

module.exports = mongoose.model("Client", clientSchema);
