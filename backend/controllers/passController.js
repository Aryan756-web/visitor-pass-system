const Pass = require("../models/Pass");
const Appointment = require("../models/Appointment");
const QRCode = require("qrcode");
const mongoose = require("mongoose");

// generate pass
const generatePass = async (req, res) => {
  const { appointmentId } = req.body;

  if (!appointmentId) {
    return res.status(400).json({ message: "No appointment id" });
  }

  try {
    if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
      return res.status(400).json({ message: "Invalid id" });
    }

    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    if (appointment.status !== "approved") {
      return res.status(400).json({ message: "Not approved yet" });
    }

    const qrText = `PASS-${appointment._id}`;
    const qrCode = await QRCode.toDataURL(qrText);

    // time logic (simplified a bit)
    const now = new Date();
    const expiry = new Date();
    expiry.setHours(expiry.getHours() + 2);

    const pass = new Pass({
      visitor: appointment.visitor,
      appointment: appointment._id,
      qrCode,
      validFrom: now,
      validTo: expiry,
    });

    await pass.save();

    res.json({
      pass,
      message: "Pass created",
    });

  } catch (err) {
    console.log("Pass error:", err.message);
    res.status(500).json({ message: "Could not generate pass" });
  }
};


// get all passes
const getPasses = async (req, res) => {
  try {
    const passes = await Pass.find();

    if (!passes || passes.length === 0) {
      return res.json({ message: "No passes yet" });
    }

    res.json({
      count: passes.length,
      passes,
    });

  } catch (err) {
    res.status(500).json({ message: "Failed to fetch passes" });
  }
};

module.exports = { generatePass, getPasses };