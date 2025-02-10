const Delivery = require("../models/Delivery");
const Client = require("../models/Client");
const Deliverer = require("../models/Deliverer");

// Create a new delivery
exports.createDelivery = async (req, res) => {
  try {
    const { clientId, packageDetails } = req.body;

    // Find the client
    const client = await Client.findById(clientId);
    if (!client) return res.status(404).json({ error: "Client not found" });

    // Generate a unique code for the delivery
    const uniqueCode = `${client.uniqueCode}-${Math.floor(
      1000 + Math.random() * 9000
    )}`;

    // Create the delivery
    const delivery = new Delivery({
      clientId,
      uniqueCode,
      packageDetails,
    });

    await delivery.save();
    res
      .status(201)
      .json({ message: "Delivery created successfully", delivery });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Assign a delivery to a deliverer
exports.assignDelivery = async (req, res) => {
  try {
    const { deliveryId, delivererId } = req.body;

    // Find the delivery and deliverer
    const delivery = await Delivery.findById(deliveryId);
    const deliverer = await Deliverer.findById(delivererId);

    if (!delivery) return res.status(404).json({ error: "Delivery not found" });
    if (!deliverer)
      return res.status(404).json({ error: "Deliverer not found" });

    // Assign the deliverer to the delivery
    delivery.delivererId = delivererId;
    delivery.status = "assigned";

    await delivery.save();
    res.json({ message: "Delivery assigned successfully", delivery });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateDeliveryStatus = async (req, res) => {
  try {
    const { deliveryId, status } = req.body;

    const delivery = await Delivery.findById(deliveryId);
    if (!delivery) return res.status(404).json({ error: "Delivery not found" });

    delivery.status = status;
    await delivery.save();

    // Emit Socket.IO event
    io.emit("deliveryStatusUpdated", { deliveryId, status });

    res.json({ message: "Delivery status updated successfully", delivery });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Get all deliveries
exports.getAllDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.find()
      .populate("clientId", "name phone uniqueCode") // Populate client details
      .populate("delivererId", "name phone vehicleType"); // Populate deliverer details

    res.json(deliveries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
