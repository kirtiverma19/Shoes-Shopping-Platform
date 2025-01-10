const userModel = require("../../models/usermodel");

const verifyOpt = async (req, res) => {
  const { otp } = req.body;
  try {
    const userotp = await userModel.findOne({ "otp.otp": otp });
    if (!userotp) {
      const error = new Error("Invalid OTP");
      error.statusCode = 400;
      throw error;
    }

    if (new Date(userotp.otp.sendTime).getTime() < new Date().getTime()) {
      const error = new Error("OTP Expired");
      error.statusCode = 400;
      throw error;
    }
    userotp.otp.otp = null;
    await userotp.save();
    res.status(200).json({
      message: "OTP verified",
      success: true,
      error: false,
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = verifyOpt;
