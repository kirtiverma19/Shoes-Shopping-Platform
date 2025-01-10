import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ForgetPassword from "../pages/ForgetPassword";
import SignUp from "../pages/SignUp";
import AdminPanel from "../pages/AdminPanel";
import AllUser from "../pages/Users";
import Product from "../pages/Products";
import CategoryList from "../components/CategoryList";
import CategoryProduct from "../pages/CategoryProduct";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import { SearchProduct } from "../pages/SearchProduct";
import VerifyOpt from "../pages/VerifyOpt";
import UpdatePassword from "../pages/UpdatePassword";
import Address from "../pages/Address";
import Checkout from "../pages/Checkout";
import OrderConfirm from "../pages/OrderConfirm";
import RentProduct from "../pages/RentProduct";
import AllOrder from "../components/AdminOrderDisplay";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forget-password",
        element: <ForgetPassword />,
      },
      {
        path: "verifyOpt",
        element: <VerifyOpt />,
      },
      {
        path: "update-password",
        element: <UpdatePassword />,
      },
      {
        path: "rent/product/:id",
        element: <RentProduct />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
      {
        path: "product-category",
        element: <CategoryProduct />,
      },
      {
        path: "product/:id",
        element: <ProductDetails />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "address",
        element: <Address />,
      },

      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "order-confirm",
        element: <OrderConfirm />,
      },
      {
        path: "search",
        element: <SearchProduct />,
      },
     
      {
        path: "admin-panel",
        element: <AdminPanel />,
        children: [
          {
            path: "all-users",
            element: <AllUser />,
          },
          {
            path: "product",
            element: <Product />,
          }, {
            path: "all-orders",
            element: <AllOrder />,
          },
        ],
      },
    ],
  },
]);

export default router;
