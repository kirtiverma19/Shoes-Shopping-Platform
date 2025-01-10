const paymentmodel = require("../../models/payment");
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: "rzp_test_YqTP4jNZJuknkg",
  key_secret: "0Hjo2gZtzFMtwYcn8nqrIiwg",
});

const payment = async (req, res) => {
  const currentuser = req.userId;
  try {
    const { amount, carditem, userid, usershipping, data } = req.body;
    //console.log(userid);
    var options = {
      amount: amount * 100, // amount in the smallest currency unit
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };
    const order = await razorpay.orders.create(options);
    res.json({
      orderid: order.id,
      amount: amount,
      carditem: carditem,
      userid: userid,
      usershipping: usershipping,
      productDetails: data,
      payStatus: "created",
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
module.exports = payment;
