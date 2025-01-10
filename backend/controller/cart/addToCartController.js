const addToCartModel = require("../../models/cartProduct");

const addToCartController = async (req, res) => {
  try {
    const productId = req?.body?.productId;
    const currentUser = req.userId;
    const size = req?.body?.size;
    const isProductAvailable = await addToCartModel.findOne({ productId });

    if (isProductAvailable) {
      return res.json({
        message: "Already exits in Add to cart",
        success: false,
        error: true,
      });
    }
    const payload = {
      productId: productId,
      quantity: 1,
      userId: currentUser,
      size: size,
      form: "Buy",
    };

    const newAddToCart = new addToCartModel(payload);
    const saveProduct = await newAddToCart.save();

    return res.json({
      data: saveProduct,
      message: "Product Added",
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

module.exports = addToCartController;
