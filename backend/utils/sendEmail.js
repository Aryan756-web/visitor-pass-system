console.log("sendEmail function triggered");
const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
  try {
    const testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    const info = await transporter.sendMail({
      from: '"Visitor App" <no-reply@test.com>',
      to,
      subject,
      text,
    });

    console.log("email sent");
    console.log("Preview URL:", nodemailer.getTestMessageUrl(info));

  } catch (err) {
    console.log("email error:", err.message);
  }
};

module.exports = sendEmail;