const addToCartModel = require("../../models/cartProduct");

const countAddToCartProduct = async (req, res) => {
  try {
    const userId = req.userId;
    const count = await addToCartModel.countDocuments({
      userId: userId,
    });
    res.json({
      data: {
        count: count,
      },
      error: false,
      success: true,
      message: "ok",
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = countAddToCartProduct;
