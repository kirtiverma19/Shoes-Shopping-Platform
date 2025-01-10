const userModel = require("../../models/usermodel");

async function allUser(req, res) {
  try {
    const allUser = await userModel.find();

    res.json({
      message: "All User",
      data: allUser,
      error: false,
      success: true,
    });
  } catch (e) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = allUser;
