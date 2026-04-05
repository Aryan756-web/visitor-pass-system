const Pass = require("../models/Pass");
const Appointment = require("../models/Appointment");
const QRCode = require("qrcode");
const mongoose = require("mongoose");

// generate pass
const generatePass = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    if (!appointmentId) {
      return res.status(400).json({ message: "Appointment ID is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
      return res.status(400).json({ message: "Invalid appointment ID" });
    }

    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    if (appointment.status !== "approved") {
      return res.status(400).json({ message: "Appointment is not approved" });
    }

    const qrData = `PASS-${appointment._id}`;
    const qrCode = await QRCode.toDataURL(qrData);

    const pass = new Pass({
      visitor: appointment.visitor,
      appointment: appointment._id,
      qrCode,
      validFrom: new Date(),
      validTo: new Date(Date.now() + 2 * 60 * 60 * 1000),
    });

    await pass.save();

    res.json({
      message: "Pass generated successfully",
      pass,
    });

  } catch (error) {
    res.status(500).json({ message: "Error generating pass" });
  }
};

// ✅ NEW FUNCTION (THIS FIXES YOUR MISTAKE)
const getPasses = async (req, res) => {
  try {
    const passes = await Pass.find();
    res.json(passes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching passes" });
  }
};

module.exports = { generatePass, getPasses };