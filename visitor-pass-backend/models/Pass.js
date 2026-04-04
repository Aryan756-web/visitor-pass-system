const mongoose = require("mongoose");

const passSchema = new mongoose.Schema({
  visitor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Visitor",
    required: true
  },
  appointment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment",
    required: true
  },
  qrCode: {
    type: String
  },
  validFrom: {
    type: Date
  },
  validTo: {
    type: Date
  },
  status: {
    type: String,
    enum: ["active", "expired"],
    default: "active"
  }
}, { timestamps: true });

const Pass = mongoose.model("Pass", passSchema);

module.exports = Pass;