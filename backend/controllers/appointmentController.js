const Appointment = require("../models/Appointment");

// create appointment
const createAppointment = async (req, res) => {
  const { visitor, date } = req.body;

  if (!visitor || !date) {
    return res.status(400).json({ message: "Missing visitor or date" });
  }

  try {
    // small real-world check (not overdone)
    const alreadyExists = await Appointment.findOne({ visitor, date });

    if (alreadyExists) {
      return res.status(400).json({ message: "Appointment already exists" });
    }

    const appointment = new Appointment({
      visitor,
      host: req.user.id,
      date,
    });

    await appointment.save();

    res.status(201).json({
      appointment,
      message: "Created",
    });

  } catch (err) {
    console.log("Create error:", err.message);
    res.status(500).json({ message: "Could not create appointment" });
  }
};


// get all appointments
const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("visitor")
      .populate("host", "name");

    res.json({ count: appointments.length, appointments });

  } catch (err) {
    console.log("Fetch failed:", err.message);
    res.status(500).json({ message: "Failed to get data" });
  }
};


// update status
const updateStatus = async (req, res) => {
  const { status } = req.body;

  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "No appointment found" });
    }

    // basic check
    if (!status) {
      return res.status(400).json({ message: "Status required" });
    }

    appointment.status = status;
    await appointment.save();

    res.json({
      message: "Status changed",
      data: appointment,
    });

  } catch (err) {
    res.status(500).json({ message: "Update failed" });
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
      appointment,
      msg: "Approved",
    });

  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  createAppointment,
  getAppointments,
  updateStatus,
  approveAppointment,
};