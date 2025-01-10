const addressmodel = require("../../models/address");

const getAddress = async (req, res) => {
  try {
    const curruserid = req?.userId;
    const address = await addressmodel.find({ userid: curruserid });
    res.json({
      message: "Address",
      data: address[0],
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

module.exports = getAddress;
