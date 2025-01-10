const productModel = require("../../models/productmodel");
const getCategoryWiseProduct = async (req, res) => {
  try {
    const { category } = req?.body || req?.query;
    const product = await productModel.find({ category });
    res.json({
      data: product,
      message: "Product",
      error: false,
      success: true,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = getCategoryWiseProduct;
