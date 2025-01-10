const productModel = require("../../models/productmodel");

const searchProduct = async (req, res) => {
  try {
    const query = req.query.q;
    const regex = new RegExp(query, 'i', 'g');
    const product = await productModel.find({
      "$or": [
        {
          productName: regex,
        },
        {
          category: regex,
        },
      ],
    });

    res.json({
      message: "Search Product list",
      data: product,
      error: false,
      success: true,
    });
  } catch (err) {
    res.json({
      message: err?.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = searchProduct;
