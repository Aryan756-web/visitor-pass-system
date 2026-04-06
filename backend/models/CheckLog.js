const mongoose = require("mongoose");

const checkLogSchema = new mongoose.Schema({
  pass: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pass",
    required: true
  },
  checkInTime: {
    type: Date
  },
  checkOutTime: {
    type: Date
  }
}, { timestamps: true });

const CheckLog = mongoose.model("CheckLog", checkLogSchema);

module.exports = CheckLog;