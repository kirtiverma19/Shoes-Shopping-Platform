const userModel = require("../../models/usermodel");

async function UpdateUser(req, res) {
  try {
    const sessionUser = req.userid;
    const { userid, email, username, role } = req.body;
    const payload = {
      ...(email && { email: email }),
      ...(username && { username: username }),
      ...(role && { role: role }),
    };

    const user = await userModel.findById(sessionUser);
   // console.log("userrole", user.role);
    const updateUser = await userModel.findByIdAndUpdate(userid, payload);

    res.json({
      data: updateUser,
      error: false,
      success: true,
      message: "User Updated",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}
module.exports = UpdateUser;
