import logo from "./logo.svg";
import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import summeryApi from "./common";
import Context from "./context";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";
function App() {
  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCount] = useState(0);

  const fetchUserDetails = async () => {
    const dataresponse = await fetch(summeryApi.current_user.url, {
      method: summeryApi.current_user.method,
      credentials: "include",
    });
    const dataApi = await dataresponse.json();
    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data));
    }
  };
  const fetchUserAddToCart = async () => {
    const dataresponse = await fetch(summeryApi.addToCartProductCount.url, {
      method: summeryApi.addToCartProductCount.method,
      credentials: "include",
    });
    const dataApi = await dataresponse.json();
    setCartProductCount(dataApi?.data?.count);
  };
  useEffect(() => {
    // user details
    fetchUserDetails();
    // user details cart
    fetchUserAddToCart();
  });
  return (
    <>
      <Context.Provider
        value={{
          fetchUserDetails, //user detail fetch
          cartProductCount, // current user add to cart
          fetchUserAddToCart,
        }}
      >
        <ToastContainer position="top-center" />
        <Header />
        <main className="min-h-[calc(100vh-120px)] pt-16">
          <Outlet />
        </main>

        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
