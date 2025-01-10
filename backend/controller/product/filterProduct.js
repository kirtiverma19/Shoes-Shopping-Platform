const productModel = require("../../models/productmodel");

const filterProductController = async (req, res) => {
  try {
    const categoryList = req?.body?.category;
    if (categoryList.length === 0) {
      const product = await productModel.find();
      res.json({
        message: "product",
        data: product,
        error: false,
        success: true,
      });
    } else {
      const product = await productModel.find({
        category: {
          $in: categoryList,
        },
      });
      res.json({
        message: "product",
        data: product,
        error: false,
        success: true,
      });
    }
  } catch (err) {
    res.json({
      message: err?.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = filterProductController;
