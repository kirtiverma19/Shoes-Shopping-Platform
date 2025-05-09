const paymentmodel = require("../../models/payment");

const AllOrder = async (req, res) => {
  const currentUser = req.userId;
  try {
    const orderdetail = await paymentmodel.find().sort({ orderDate: -1 });
    res.json({
      ord: orderdetail,
      message: "Order Detail",
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
module.exports = AllOrder;
