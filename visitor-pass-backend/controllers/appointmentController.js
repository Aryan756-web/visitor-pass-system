const Appointment = require("../models/Appointment");

// create appointment
const createAppointment = async (req, res) => {
  try {
    console.log("👉 BODY:", req.body);
    console.log("👉 USER:", req.user);
    const { visitor, date } = req.body;

    const appointment = new Appointment({
      visitor,
      host: req.user.id,
      date,
    });

    await appointment.save();

    res.status(201).json({
      message: "Appointment created",
      appointment,
    });
  } catch (error) {
    console.log("🔥 FULL ERROR:", error);
    console.log("🔥 MESSAGE:", error.message);
    console.log("🔥 STACK:", error.stack);

    res.status(500).json({ message: "Server error" });
  }
};

// get all appointments
const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("visitor")
      .populate("host", "name email");

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// update status
const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.status = status;

    await appointment.save();

    res.json({
      message: "Status updated",
      appointment,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

//approve appointments
const approveAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.status = "approved";
    await appointment.save();

    res.json({ message: "Appointment approved", appointment });
  } catch (error) {
    console.log("APPROVE ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createAppointment,
  getAppointments,
  updateStatus,
  approveAppointment
};
