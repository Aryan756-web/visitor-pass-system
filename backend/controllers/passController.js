const Pass = require("../models/Pass");
const Appointment = require("../models/Appointment");
const QRCode = require("qrcode");
const mongoose = require("mongoose");
const PDFDocument = require("pdfkit");
const sendEmail = require("../utils/sendEmail");

// generate pass
const generatePass = async (req, res) => {
  const { appointmentId } = req.body;

  if (!appointmentId) {
    return res.status(400).json({ message: "No appointment id" });
  }

  try {
    console.log("Generating pass...");
    if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
      return res.status(400).json({ message: "Invalid id" });
    }

    const appointment = await Appointment.findById(appointmentId).populate("visitor");

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    if (appointment.status !== "approved") {
      return res.status(400).json({ message: "Not approved yet" });
    }

    const qrText = `PASS-${appointment._id}`;
    const qrCode = await QRCode.toDataURL(qrText);

    // time logic (simplified a bit)
    const now = new Date();
    const expiry = new Date();
    expiry.setHours(expiry.getHours() + 2);

    const pass = new Pass({
      visitor: appointment.visitor,
      appointment: appointment._id,
      qrCode,
      validFrom: now,
      validTo: expiry,
    });

    await pass.save();
    console.log("Sending email to:", appointment.visitor.email);
    console.log("Visitor object:", appointment.visitor);

    console.log("About to send email...");
    await sendEmail(
      appointment.visitor.email,
      "Visitor Pass Generated",
      `Your pass has been created. Pass ID: ${pass._id}`,
    );

    res.json({
      pass,
      message: "Pass created",
    });
  } catch (err) {
    console.log("Pass error:", err.message);
    res.status(500).json({ message: "Could not generate pass" });
  }
};

// get all passes
const getPasses = async (req, res) => {
  try {
    const passes = await Pass.find();

    if (!passes || passes.length === 0) {
      return res.json({ message: "No passes yet" });
    }

    res.json({
      count: passes.length,
      passes,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch passes" });
  }
};

const downloadPassPDF = async (req, res) => {
  try {
    const pass = await Pass.findById(req.params.id).populate("visitor");

    if (!pass) {
      return res.status(404).json({ message: "Pass not found" });
    }

    const doc = new PDFDocument();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=pass_${pass._id}.pdf`,
    );

    doc.pipe(res);

    doc.fontSize(20).text("Visitor Pass", { align: "center" });

    doc.moveDown();
    doc.fontSize(14).text(`Name: ${pass.visitor.name}`);
    doc.text(`Email: ${pass.visitor.email}`);
    doc.text(`Pass ID: ${pass._id}`);
    doc.text(`Valid From: ${new Date(pass.validFrom).toLocaleString()}`);
    doc.text(`Valid To: ${new Date(pass.validTo).toLocaleString()}`);

    doc.moveDown();

    if (pass.qrCode) {
      const base64Data = pass.qrCode.replace(/^data:image\/png;base64,/, "");
      const imgBuffer = Buffer.from(base64Data, "base64");

      doc.image(imgBuffer, {
        fit: [150, 150],
        align: "center",
      });
    }

    doc.end();
  } catch (err) {
    console.log("PDF error:", err.message);
    res.status(500).json({ message: "Error generating PDF" });
  }
};
module.exports = { generatePass, getPasses, downloadPassPDF };
