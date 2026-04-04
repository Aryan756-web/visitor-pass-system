const Pass = require("../models/Pass")
const Appointment = require("../models/Appointment");
const QRCode = require("qrcode");

//generate pass
const generatePass = async (req, res) => {
    try{
        const { appointmentId } = req.body;
        
        //find appointment
        const appointment = await Appointment.findById(appointmentId);

        if (!appointment || appointment.status !== "approved") {
            return res.status(400).json({ message: "Appointment Not Approved"})
        }

        //generate QR data (simple)
        const qrData = `PASS-${appointment._id}`;

        const qrCode = await QRCode.toDataURL(qrData);

        //create pass
        const pass = new Pass({
        visitor: appointment.visitor,
        appointment: appointment._id,
        qrCode,
        validFrom: new Date(),
        vailtTo: new Date(Date.now() + 2 * 60 * 60 * 1000) // 2 hours
        });

        await pass.save();

        res.json({
            message: "Pass generated",
            pass 
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
  }
};

module.exports = { generatePass };
