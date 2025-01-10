const addressmodel = require("../../models/address");
const addAddress = async (req, res) => {
  try {
    const {
      username,
      address,
      city,
      state,
      country,
      pincode,
      phoneNumber,
    } = req.body;

   const currentUser = req.userId;
    let useraddress = await addressmodel.create({
      userid:currentUser,
      username,
      address,
      city,
      state,
      country,
      pincode,
      phoneNumber,
    });
    res.json({
      message: "Address added successfully",
      data: useraddress,
      error: false,
      success: true,
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = addAddress;
