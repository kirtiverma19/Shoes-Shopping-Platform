const uploadProductPermission = require("../../helpers/permission");
const productModel = require("../../models/productmodel");
async function UploadProductController(req, res) {
  try {
    const sessionUserId = req.userId;
    if (!uploadProductPermission(sessionUserId)) {
      throw new Error("Permission denied");
    }
    const {
      productName,
      brandName,
      category,
      productImage,
      size,
      description,
      price,
      sellingPrice,
      rentprice,
      securityfee,
    } = req.body;
 console.log(req.body);
    const newProduct = new productModel({
      productName,
      brandName,
      category,
      productImage: productImage || [],
      size: size || [],
      description,
      price,
      sellingPrice,
      rentprice,
      securityfee,
    });

    const saveProduct = await newProduct.save();

    res.status(201).json({
      message: "Product Upload Successfully",
      error: false,
      success: true,
      data: saveProduct,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = UploadProductController;
