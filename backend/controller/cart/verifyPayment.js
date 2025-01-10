const paymentmodel = require("../../models/payment");
const addToCartModel = require("../../models/cartProduct");
const verifyPayment = async (req, res) => {
  const curruser = req.userId;
  try {
    const {
      Payment_id,
      Order_id,
      Razor_Signature,
      amount,
      orderItem,
      userId,
      usershipping,
    } = req.body;
    const orderConfirm = await paymentmodel.create({
      Payment_id,
      Order_id,
      Razor_Signature,
      amount,
      orderItem,
      userId,
      usershipping,
      payStatus: "paid",
    });
    if (orderConfirm?._id) {
      const deleteCartItem = await addToCartModel.deleteMany({ userId });
    }
    res.json({
      message: "Order Confirmed",
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
module.exports = verifyPayment;
