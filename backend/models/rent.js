const mongoose = require("mongoose");

const rentSchema = new mongoose.Schema(
  {
    productId: {
      ref: "product",
      type: String,
    },
    quantity: Number,
    userId: String,
    size: Number,
    deliverydate: Date,
    form: String,
  },
  {
    timestamps: true,
  }
);

const rentmodel = mongoose.model("rent", rentSchema);
module.exports = rentmodel;
