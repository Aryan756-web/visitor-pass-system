const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  visitor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Visitor",
    required: true
  },

  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  date: {
    type: Date,
    required: true
  },

  status: {
    type: String,
    default: "pending"
  }

});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;