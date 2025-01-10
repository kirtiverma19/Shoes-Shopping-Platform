const nodemailer = require("nodemailer");

const sendMail = (otp, email) => {
  try {
    const transport = nodemailer.createTransport({
      service: "GMAIL",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOption = {
      from: process.env.EMAIL,
      to: email,
      subject: "reset password otp",
      html: `<div>${otp}</div>`,
    };

    transport.sendMail(mailOption, (res,error, info) => {
      if (error) {
        return res.send({ Status: "Failed to send email" });
      }
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = sendMail;
