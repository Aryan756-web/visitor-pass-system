const Pass = require("../models/Pass");
const CheckLog = require("../models/CheckLog");

// check-in
const checkIn = async (req, res) => {
    try {
        const { passId } = req.body;

        const pass = await Pass.findById(passId);

        if (!pass || pass.status !== "active") {
            return res.status(400).json({ message: "Invalid pass"});
        }

        const log = new CheckLog({
            pass: passId,
            checkInTime: new Date()
        });

        await log.save();

        res.json({ message : "Checked in", log });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error"});
        
    }
};

//checkout
const checkOut = async (req, res) => {
    try{
        const { passId } = req.body;

        const log = await CheckLog.findOne({
        pass: passId,
        checkOutTime: { $exists: false }
        });

        if (!log) {
            return res.status(400).json({ message: "No active check-in found"});
        }

        log.checkOutTime = new Date();

        await log.save();

        res.json({message: "Checked out", log });
    } catch (error) {
        console.log(error); 
        res.status(500).json({ message: "Server error "});
    }
};

module.exports = { checkIn, checkOut };