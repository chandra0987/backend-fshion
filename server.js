const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require('./config/Db');

dotenv.config();

const app = express();
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", require('./routes/authRoutes'));
app.use("/api/products", require("./routes/productRoute"));
app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/wishlist", require("./routes/wishlistRoute"));

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "SINGAM API Running 🦁",
    time: new Date()
  });
});

// Start server
const PORT = process.env.PORT || 3020;

app.listen(PORT, () => {
  console.log(`🦁 SINGAM Server running on port ${PORT}`);
});



