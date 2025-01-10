const express = require("express");

const router = express.Router();

const userSignUpController = require("../controller/user/userSignup");
const userSignInController = require("../controller/user/userSignin");
const userDetailsController = require("../controller/user/userDetails");
const UploadProductController = require("../controller/product/UploadProduct");
const authToken = require("../middleware/authToken");
const userLogout = require("../controller/user/userLogout");
const allUser = require("../controller/user/allUser");
const UpdateUser = require("../controller/user/UpdateUser");
const getProductController = require("../controller/product/getProduct");
const updateProductController = require("../controller/product/updateProduct");
const getCategoryProduct = require("../controller/product/getCategoryProductOne");
const getCategoryWiseProduct = require("../controller/product/getCategoryWiseProduct");
const getProductDetails = require("../controller/product/getProductDetails");
const addToCartController = require("../controller/cart/addToCartController");
const countAddToCartProduct = require("../controller/cart/countAddToCarProduct");
const addToCartViewProduct = require("../controller/cart/addToCartViewProduct");
const updateAddToCartProduct = require("../controller/cart/updateAddToCartProduct");
const deleteAddToCartProduct = require("../controller/cart/deleteAddToCartProduct");
const searchProduct = require("../controller/product/searchProduct");
const filterProductController = require("../controller/product/filterProduct");
const forgetPassword = require("../controller/user/forgetPassword");
const verifyOpt = require("../controller/user/verifyOtp");
const getOtpTime = require("../controller/user/getOtpTime");
const passwordUpdate = require("../controller/user/passwordUpdate");
const address = require("../controller/cart/address");
const getAddress = require("../controller/user/getAddress");
const payment = require("../controller/cart/payment");
const verifyPayment = require("../controller/cart/verifyPayment");
const orderDetail = require("../controller/cart/orderconfirmDetail");
const updateCart = require("../controller/cart/updateCart");
const AllOrders = require("../controller/cart/AllOrder");

//user
router.post("/signup", userSignUpController);
router.post("/signin", userSignInController);
router.get("/user-details", authToken, userDetailsController);
router.get("/user-logout", userLogout);
router.post("/forget-password", forgetPassword);
router.post("/verify-otp", verifyOpt);
router.post("/get-otp-time", getOtpTime);
router.post("/password-update", passwordUpdate);
router.post("/address", authToken, address);
router.post("/get-address", authToken, getAddress);
router.post("/payment", authToken, payment);
router.post("/verify-payment", authToken, verifyPayment);

// admin panel
router.get("/all-user", authToken, allUser);
router.post("/update-user", authToken, UpdateUser);

//product
router.post("/upload-product", authToken, UploadProductController);
router.get("/get-product", getProductController);
router.post("/update-product", authToken, updateProductController);
router.get("/get-categoryProduct", getCategoryProduct);
router.post("/category-product", getCategoryWiseProduct);
router.post("/product-details", getProductDetails);
router.get("/search", searchProduct);
router.post("/filter-product", filterProductController);

//user Add to cart
router.post("/addtocart", authToken, addToCartController);
router.get("/countAddToCartProduct", authToken, countAddToCartProduct);
router.get("/view-cart-product", authToken, addToCartViewProduct);
router.post("/update-cart-product", authToken, updateAddToCartProduct);
router.post("/delete-cart-product", authToken, deleteAddToCartProduct);
router.get("/order-detail", authToken, orderDetail);
router.get("/all-detail", AllOrders);
router.post("/updatecart", authToken, updateCart);
module.exports = router;
