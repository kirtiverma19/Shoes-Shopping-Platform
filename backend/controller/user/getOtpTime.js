const userModel = require("../../models/usermodel");

const getOtpTime = async (req, res) => {
  const { token } = req.body;

  try {
    const user = await userModel.findOne({ "otp.token": token }).select("otp");
    if (!user) {
      const error = new Error("Something went wrong");
      error.statusCode = 400;
      throw error;
    }

    res.status(200).json({
      sendTime: user.otp.sendTime,
      error: false,
      success: true,
      message: "Sucsess",
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = getOtpTime;
