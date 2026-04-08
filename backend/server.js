console.log("MONGO:", process.env.MONGO_URI ? "OK" : "MISSING");
console.log("JWT:", process.env.JWT_SECRET ? "OK" : "MISSING");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const visitorRoutes = require("./routes/visitorRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const passRoutes = require("./routes/passRoutes");
const checkRoutes = require("./routes/checkRoutes");

const protect = require("./middleware/authMiddleware");
const authorizeRoles = require("./middleware/roleMiddleware");
const errorHandler = require("./middleware/errorMiddleware");

dotenv.config();

// basic env check
if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
  console.log("Missing env variables");
  process.exit(1);
}

// connect DB
connectDB();

const app = express();

// middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev")); // request logging

// routes
app.use("/api/auth", authRoutes);
app.use("/api/visitors", visitorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/pass", passRoutes);
app.use("/api/check", checkRoutes);

// test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// protected route
app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: "Authorized",
    user: req.user
  });
});

// admin route
app.get("/api/admin", protect, authorizeRoles("admin"), (req, res) => {
  res.json({ message: "Admin access" });
});

// error handler (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on ${PORT}`);
});