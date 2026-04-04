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
        required: true 
    },
    date: {
        type: Date,
        required: true 
    },
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
    }
}, { timestamps: true });

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;