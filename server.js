require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const clientRoutes = require("./routes/clientRoutes");
const delivererRoutes = require("./routes/delivererRoutes");
const adminRoutes = require("./routes/adminRoutes");
const deliveryRoutes = require("./routes/deliveryRoutes");

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/clients", clientRoutes);
app.use("/api/deliverers", delivererRoutes);
app.use("/api/admins", adminRoutes);
app.use("/api/deliveries", deliveryRoutes);

// Dynamic Server Message (like an animation)
const startServerMessage = () => {
  const loadingMessages = [
    "🚀 Booting up the UDT Backend...",
    "🔧 Tuning the engine...",
    "🌐 Connecting to the cloud...",
    "💾 Syncing the database...",
    "🚀 UDT Backend is now live!",
  ];

  let i = 0;
  const interval = setInterval(() => {
    console.clear(); // Clear previous message
    console.log(loadingMessages[i]);

    i++;
    if (i === loadingMessages.length) {
      clearInterval(interval);
      console.log("🚀 UDT Backend is up and running! ✅");
      console.log("Server running on port " + (process.env.PORT || 5000));
    }
  }, 1000);
};

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  startServerMessage();
});
