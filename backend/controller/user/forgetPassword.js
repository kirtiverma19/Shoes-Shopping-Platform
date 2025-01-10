const userModel = require("../../models/usermodel");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendMail = require("../../helpers/sendMail");

const ForgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    if (
      user.otp.otp &&
      new Date(user.otp.sendTime).getTime() > new Date().getTime()
    ) {
      throw new Error(
        `please wait until ${new Date(user.otp.sendTime).toLocaleTimeString()}`
      );
    }

    const otp = Math.floor(Math.random() * 90000) + 100000;

    const token = process.env.TOKEN_SECREAT_KEY;

    user.otp.otp = otp;
    user.otp.sendTime = new Date().getTime() + 1 * 60 * 1000;
    user.otp.token = token;

    await user.save();

    sendMail(otp, email);

    res.json({
      message: "Please check your email for OTP",
      error: false,
      success: true,
      token,
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = ForgetPassword;
