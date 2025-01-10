const mongoose = require("mongoose");

const addToCart = new mongoose.Schema(
 {
   productId:{
    ref:'product',
    type:String,
   },
   quantity:Number,
   userId:String,
   size:Number,
   form:String,
   deliverydate:Date,
 },{
    timestamps: true,
 }
);

const addToCartModel = mongoose.model("addToCart", addToCart);
module.exports = addToCartModel;
