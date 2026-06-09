const Visitor = require("../models/Visitor");
const Appointment = require("../models/Appointment");
const Pass = require("../models/Pass");
const CheckLog = require("../models/CheckLog");

const getDashboardStats = async (req, res) => {
  try {
    const visitors = await Visitor.countDocuments();
    const appointments = await Appointment.countDocuments();
    const passes = await Pass.countDocuments();
    const checkins = await CheckLog.countDocuments();

    res.json({
      visitors,
      appointments,
      passes,
      checkins
    });
  } catch (error) {
    console.log("DASHBOARD ERROR:", error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};

module.exports = {
  getDashboardStats
};