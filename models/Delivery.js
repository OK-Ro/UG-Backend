const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  }, // Reference to the client
  delivererId: { type: mongoose.Schema.Types.ObjectId, ref: "Deliverer" }, // Reference to the deliverer (optional initially)
  uniqueCode: { type: String, required: true }, // Unique code for the delivery
  packageDetails: { type: String, required: true }, // Description of the package
  status: {
    type: String,
    enum: ["pending", "assigned", "picked-up", "delivered"],
    default: "pending",
  }, // Delivery status
  timestamp: { type: Date, default: Date.now }, // Timestamp of the delivery
});

module.exports = mongoose.model("Delivery", deliverySchema);
