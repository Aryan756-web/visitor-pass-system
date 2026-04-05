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

router.post("/", protect, createAppointment);
router.get("/", protect, getAppointments);
router.put("/:id", protect, updateStatus);
router.put("/:id/approve", protect, approveAppointment);
router.post("/", protect, validateAppointment, createAppointment);

module.exports = router;