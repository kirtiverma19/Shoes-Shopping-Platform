const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: String,
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: String,
    otp: {
      otp: { type: String },
      sendTime: { type: Number },
      token: { type: String },
    },
    profilePic: String,
    role: String,
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
