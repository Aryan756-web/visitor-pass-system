const express = require("express");
const {
  createAppointment,
  getAppointments,
  updateStatus,
  approveAppointment
} = require("../controllers/appointmentController");

const protect = require("../middleware/authMiddleware");
const { validateAppointment } = require("../middleware/validationMiddleware");

const router = express.Router();

// create
router.post("/", protect, validateAppointment, createAppointment);

// get all
router.get("/", protect, getAppointments);

// update status
router.put("/:id", protect, updateStatus);

// approve
router.put("/:id/approve", protect, approveAppointment);

module.exports = router;