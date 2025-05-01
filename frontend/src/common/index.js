const backendDomain = "https://shoes-shopping-platform-backend.onrender.com";

const summeryApi = {
  signUp: {
    url: `${backendDomain}/api/signup`,
    method: "post",
  },
  signIn: {
    url: `${backendDomain}/api/signin`,
    method: "post",
  },
  current_user: {
    url: `${backendDomain}/api/user-details`,
    method: "get",
  },
  user_logout: {
    url: `${backendDomain}/api/user-logout`,
    method: "get",
  },
  allUser: {
    url: `${backendDomain}/api/all-user`,
    method: "get",
  },
  UpdateUser: {
    url: `${backendDomain}/api/update-user`,
    method: "post",
  },
  uploadProduct: {
    url: `${backendDomain}/api/upload-product`,
    method: "post",
  },
  allProduct: {
    url: `${backendDomain}/api/get-product`,
    method: "get",
  },
  updateProduct: {
    url: `${backendDomain}/api/update-product`,
    method: "post",
  },
  categoryProduct: {
    url: `${backendDomain}/api/get-categoryProduct`,
    method: "get",
  },
  categoryWiseProduct: {
    url: `${backendDomain}/api/category-product`,
    method: "post",
  },
  productDetails: {
    url: `${backendDomain}/api/product-details`,
    method: "post",
  },
  addToCartProduct: {
    url: `${backendDomain}/api/addtocart`,
    method: "post",
  },
  addToCartProductCount: {
    url: `${backendDomain}/api/countAddToCartProduct`,
    method: "get",
  },
  addToCartProductView: {
    url: `${backendDomain}/api/view-cart-product`,
    method: "get",
  },
  updateCartProduct: {
    url: `${backendDomain}/api/update-cart-product`,
    method: "post",
  },
  deleteCartProduct: {
    url: `${backendDomain}/api/delete-cart-product`,
    method: "post",
  },
  updatecart: {
    url: `${backendDomain}/api/updatecart`,
    method: "post",
  },
  clearCart: {
    url: `${backendDomain}/api/clear-cart-product`,
    method: "post",
  },
  searchProduct: {
    url: `${backendDomain}/api/search`,
    method: "get",
  },
  filterProduct: {
    url: `${backendDomain}/api/filter-product`,
    method: "post",
  },
  forgetPassword: {
    url: `${backendDomain}/api/forget-password`,
    method: "post",
  },
  verifyOtp: {
    url: `${backendDomain}/api/verify-otp`,
    method: "post",
  },
  getOtpTime: {
    url: `${backendDomain}/api/get-otp-time`,
    method: "post",
  },
  updatePassword: {
    url: `${backendDomain}/api/password-update`,
    method: "post",
  },
  Address: {
    url: `${backendDomain}/api/address`,
    method: "post",
  },
  getaddress: {
    url: `${backendDomain}/api/get-address`,
    method: "post",
  },
  payment: {
    url: `${backendDomain}/api/payment`,
    method: "post",
  },
  verifypayment: {
    url: `${backendDomain}/api/verify-payment`,
    method: "post",
  },
  orderDetail:{
    url: `${backendDomain}/api/order-detail`,
    method: "get",
  },
  AllOrder:{
    url: `${backendDomain}/api/all-detail`,
    method: "get",
  }
};

export default summeryApi;
