const Appointment = require("../models/Appointment");

// create appointment
const createAppointment = async (req, res) => {
  try {
    const { visitor, date } = req.body;

    // basic validation
    if (!visitor || !date) {
      return res.status(400).json({ message: "Visitor and date are required" });
    }

    const appointment = new Appointment({
      visitor,
      host: req.user.id,
      date,
    });

    await appointment.save();

    res.status(201).json({
      message: "Appointment created successfully",
      appointment,
    });

  } catch (error) {
    res.status(500).json({ message: "Error creating appointment" });
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
    res.status(500).json({ message: "Error fetching appointments" });
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
      message: "Status updated successfully",
      appointment,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating status" });
  }
};

// approve appointment
const approveAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.status = "approved";
    await appointment.save();

    res.json({
      message: "Appointment approved successfully",
      appointment,
    });
  } catch (error) {
    res.status(500).json({ message: "Error approving appointment" });
  }
};

module.exports = {
  createAppointment,
  getAppointments,
  updateStatus,
  approveAppointment,
};