const bcrypt = require("bcryptjs");
const userModel = require("../../models/usermodel");

async function userSignUpController(req, res) {
  try {
    const { email, password, username } = req.body;

    const user = await userModel.findOne({ email });
    if (user) {
      throw new Error("User Already exits");
    }
    if (!email) {
      throw new Error("Please provide email");
    }
    if (!password) {
      throw new Error("Please provide password");
    }
    if (!username) {
      throw new Error("Please provide username");
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(password, salt);
    if (!hash) {
      throw new Error("Something is wrong");
    }

    const payload = {
      ...req.body,
      role: "GENERAL",
      password: hash,
    };

    const userData = new userModel(payload);
    const saveUser = await userData.save();
    res.status(201).json({
      data: saveUser,
      success: true,
      error: false,
      message: "User created Successfully ",
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = userSignUpController;
