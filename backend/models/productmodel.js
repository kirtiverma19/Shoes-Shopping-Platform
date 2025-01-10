const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: String,
    brandName: String,
    category: String,
    productImage: [],
    size: [],
    description: String,
    price: Number,
    sellingPrice: Number,
    rentprice: { type: Number, required: true },
    securityfee: { type: Number, required: true },
    deliverydate: { type: Date },
  },
  {
    timestamps: true,
  }
);

const productModel = mongoose.model("product", productSchema);
module.exports = productModel;
