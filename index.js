require("dotenv").config();  // Load .env file at the very top

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

// Import route files
const vendorRoutes = require("./routes/vendorRoutes");
const firmRoutes = require("./routes/firmRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected Successfully!"))
.catch((error) => console.error("❌ MongoDB Connection Error:", error));

// API Routes
app.use("/vendor", vendorRoutes);
app.use("/firm", firmRoutes);
app.use("/product", productRoutes);

// Default Route (Fix: Changed from `app.use` to `app.get`)
app.get("/", (req, res) => {
  res.send("<h1>Welcome to SUBY</h1>");
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server started and running at ${PORT}`);
});
