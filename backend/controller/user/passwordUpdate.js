const userModel = require("../../models/usermodel");
const brypt = require("bcrypt");
const updatePassword = async (req, res) => {
  const { password, confirmpassword, token } = req.body;
  try {
    const user = await userModel.findOne({ "otp.token": token });
    if (!user) {
      const error = new Error("Something went wrong");
      error.statusCode = 400;
      throw error;
    }

    if (
      new Date(user.otp.sendTime).getTime() + 5 * 60 * 10 <
      new Date().getTime()
    ) {
      const error = new Error("Something went wrong");
      error.statusCode = 400;
      throw error;
    }

    if (password !== confirmpassword) {
      const error = new Error("Password and confirm password does not match");
      error.statusCode = 400;
      throw error;
    }

    const hashedPassword = await brypt.hash(password, 10);

    user.password = hashedPassword;
    user.otp.sendTime = null;
    user.otp.token = null;
    await user.save();
    res.status(200).json({
      error: false,
      success: true,
      message: "password updated successfully",
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = updatePassword;
