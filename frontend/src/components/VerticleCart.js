import { Link } from "react-router-dom";
import React, { useContext, useEffect, useRef, useState } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import displayINRCurrency from "../helpers/displayCurrency";
import AddToCart from "../helpers/AddToCart";
import Context from "../context";
import scrollTop from "../helpers/scollTop";
function VerticleCart({ loading, data = [] }) {
  const { fetchUserAddToCart } = useContext(Context);
  const loadingList = new Array(13).fill(null);
  const handleAddToCart = async (e, id) => {
    await AddToCart(e, id);
    fetchUserAddToCart();
  };

  return (
    <div className=" grid grid-cols-[repeat(auto-fit,minmax(260px,300px))] justify-center md:justify-around md:gap-6 overflow-scroll  scrollbar-none transition-all">
      {loading
        ? loadingList.map((product, index) => {
            return (
              <div className="w-full min-w-[280px] md:min-w-[320px]  max-w-[280px] md:max-w-[320px]   bg-white rounded-sm shadow">
                <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] "></div>
                <div className="p-4 grid gap-3 w-full">
                  <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1  text-black bg-slate-200 animate-pulse py-2 rounded-full"></h2>
                  <p className="capitalize text-slate-500 bg-slate-200 animate-pulse py-2 rounded-full "></p>
                  <div className="flex gap-3">
                    <p className="text-blue-400 font-medium bg-slate-200 animate-pulse py-2 rounded-full w-full"></p>
                    <p className="text-slate-500 line-through bg-slate-200 animate-pulse py-2 rounded-full w-full"></p>
                  </div>
                  <button className="text-sm  px-3  rounded-full text-white bg-slate-200 animate-pulse py-2 w-full"></button>
                </div>
              </div>
            );
          })
        : data.map((product, index) => {
            return (
              <Link
                to={"/product/" + product._id}
                className="w-full min-w-[280px] md:min-w-[320px]  max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow"
              >
                <div className="bg-slate-200  pt-4 pb-4 min-w-[120px] md:min-w-[145px]  overflow-hidden">
                  <img
                    src={product.productImage[0]}
                    className=" h-full hover:scale-110 transition-all mix-blend-multiply overflow-hidden"
                    alt="p-img"
                  />
                </div>
                <div className="p-4  grid gap-3">
                  <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black ">
                    {product?.productName}
                  </h2>
                  <p className="capitalize text-slate-500">
                    {product.category}
                  </p>
                  <div className="flex gap-3">
                    <p className="text-red-600 font-medium">
                      {displayINRCurrency(product?.sellingPrice)}
                    </p>
                    <p className="text-slate-500 line-through">
                      {displayINRCurrency(product?.price)}
                    </p>
                  </div>
                  <div className="flex flex-row justify-between">
                    <Link
                      to={`/product/${product._id}`}
                      className="text-sm bg-blue-400 hover:bg-blue-500 px-3 py-0.5 rounded-full text-white"
                    >
                      Buy
                    </Link>
                    <Link
                      to={`/rent/product/${product._id}`}
                      className="text-sm bg-blue-400 hover:bg-blue-500 px-3 py-0.5 rounded-full text-white"
                    >
                      Rent
                    </Link>
                  </div>
                </div>
              </Link>
            );
          })}
    </div>
  );
}

export default VerticleCart;
