import React, { useContext, useState } from "react";
import Logo from "./Logo";
import { ImSearch } from "react-icons/im";
import { FaRegUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import summeryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import ROLE from "../common/role";
import Context from "../context";
import logo from "../assest/Banner/logo2.png";
const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay, setmenuDisplay] = useState(false);
  const context = useContext(Context);
  const navigate = useNavigate(Context);
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll("q");
  const [search, setSearch] = useState(searchQuery);

  const handlelogout = async () => {
    const fetchData = await fetch(summeryApi.user_logout.url, {
      method: summeryApi.user_logout.method,
      credentials: "include",
    });

    const data = await fetchData.json();
    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/");
    }

    if (data.error) {
      toast.error(data.message);
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate(`/search`);
    }
  };

  return (
    <header className="h-16 shadow-md bg-white fixed w-full z-40">
      <div className="container mx-auto h-full flex items-center px-4 justify-between">
        <div className="flex flex-row items-center">
          <div className="h-16 w-20 mt-4 ">
            <Link to={"/"}>
              <img src={logo} />
            </Link>
          </div>
          <div className="relative">
            <p className="font-serif absolute text-blue-700 bottom-0 top-0 font-extrabold text-2xl">
              Shoes
            </p>
          </div>
        </div>

        <div className=" hidden lg:flex items-center w-full justify-center max-w-sm border rounded-full focus-within:shadow pl-1">
          <input
            type="text"
            placeholder="Search product here.."
            className="w-full outline-none "
            onChange={handleSearch}
            value={search}
          />
          <div className="text-lg text-white min-w-[50px] bg-blue-400 h-8 flex items-center justify-center rounded-r-full">
            <ImSearch />
          </div>
        </div>

        <div className="flex items-center gap-7">
          <div className="relative  flex  justify-center">
            {user?._id && (
              <div
                className="text-3xl cursor-pointer relative flex justify-center"
                onClick={() => setmenuDisplay((prev) => !prev)}
              >
                {user?.profilePic ? (
                  <img
                    src={user?.profilePic}
                    className=" h-10 w-10 rounded-full"
                    alt={user?.username}
                  />
                ) : (
                  <FaRegUser />
                )}
              </div>
            )}

            {menuDisplay && (
              <div className="absolute bg-white bottom-0 top-11 h-fit p-4  shadow-lg rounded">
                <nav>
                  {user?.role === ROLE.ADMIN && (
                    <Link
                      to={"/admin-panel/product"}
                      className="whitespace-nowrap hover:bg-slate-100 p-2 hidden md:block "
                      onClick={() => setmenuDisplay((prev) => !prev)}
                    >
                      Admin panel
                    </Link>
                  )}
                  {user?.role === ROLE.GENERAL && (
                    <Link
                      to={"/order-confirm"}
                      className="whitespace-nowrap hover:bg-slate-100 p-2 hidden md:block "
                      onClick={() => setmenuDisplay((prev) => !prev)}
                    >
                      Order
                    </Link>
                  )}
                </nav>
              </div>
            )}
          </div>

          {user?._id && (
            <Link to={"/cart"} className="text-2xl relative">
              <span>
                <FaShoppingCart />
              </span>

              <div className="bg-blue-400 text-white w-5 flex items-center h-5 rounded-full justify-center absolute -top-2 -right-3">
                <p className="text-sm">{context?.cartProductCount}</p>
              </div>
            </Link>
          )}

          <div>
            {user?._id ? (
              <button
                onClick={handlelogout}
                className="px-3 py-1 rounded-full bg-blue-400 text-white hover:bg-blue-500 "
              >
                Logout
              </button>
            ) : (
              <Link
                to={"/login"}
                className="px-3 py-1 rounded-full bg-blue-400 text-white hover:bg-blue-500 "
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
