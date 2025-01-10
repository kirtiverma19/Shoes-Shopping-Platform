import React, { useContext, useEffect, useState } from "react";
import summeryApi from "../common";
import Context from "../context";
import displayINRCurrency from "../helpers/displayCurrency";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import moment from "moment";
function OrderConfirm() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const loadingCart = new Array(context.cartProductCount).fill(null);

  const fetchorder = async () => {
    setLoading(true);
    const payres = await fetch(summeryApi.orderDetail.url, {
      method: summeryApi.orderDetail.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });
    setLoading(false);
    const respaydata = await payres.json();
    setData(respaydata.ord);
  };

  useEffect(() => {
    fetchorder();
  }, []);

  return (
    <>
      <div className="mx-auto container">
        <div className="text-center text-lg my-3">
          {data.length === 0 && !loading && (
            <Link to="/" className="text-blue-400 py-5 cursor-pointer">
              Go for shop
            </Link>
          )}
        </div>

        <div className="flex flex-col lg:flex-col gap-10 px-16">
          <div className="text-center py-6 flex  flex-col w-full  ">
            <p className="text-3xl font-bold  text-blue-400">
              Your Order has been confirm
            </p>
            <h3 className="text-xl font-semibold font-sm text-slate-600 ">
              It will delivered soon
            </h3>
          </div>
          {/* view product */}
          <div className="w-full max-w-3xl ">
            {loading
              ? loadingCart.map((el, index) => {
                  return (
                    <div
                      key={index + "add to card"}
                      className="w-full  bg-slate-200 my-1 h-32 border border-slate-300 rounded animate-pulse"
                    ></div>
                  );
                })
              : data.map((product, index) => {
                  return (
                    <div key={product?._id + "Add To Cart Loading"}>
                      {product.orderItem.map((order, index) => {
                        return (
                          <div className="w-full bg-white my-2 border border-slate-300 grid grid-cols-[128px,1fr]   rounded">
                            <div className="w-40 bg-slate-200 h-full">
                              <img
                                src={order?.productId?.productImage[0]}
                                className="w-full h-full"
                                alt="product-img"
                              />
                            </div>
                            <div className="px-4 ml-7 py-2 relative ">
                              <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1">
                                {order?.productId?.productName}
                              </h2>
                              <p className="capitalize text-slate-500">
                                {order?.productId?.category}
                              </p>
                              <div className="flex  justify-between">
                                <p className="capitalize text-slate-500">
                                  {product.Order_id}
                                </p>
                                <p className="capitalize text-slate-500">
                                  {moment(product?.orderDate).format("L")}
                                </p>
                              </div>

                              <p className="capitalize text-slate-500">
                                Size:
                                {order?.size}
                              </p>
                              <div className="flex items-center justify-between">
                                <p className="text-red-600 font-medium text-lg">
                                  {order?.form}
                                </p>
                                {order?.form == "Rent" ? (
                                  <p className="text-red-600 ">
                                    {moment(order?.deliverydate).format("L")}
                                  </p>
                                ) : (
                                  <p></p>
                                )}
                              </div>
                              <div className="flex  justify-between">
                                <p className="capitalize text-slate-500">
                                  {product.Payment_id}
                                </p>
                                <p className="capitalize text-slate-500">
                                  {product.payStatus}
                                </p>
                              </div>

                              <div>
                                {product.form == "Rent" ? (
                                  <div>
                                    <div className="flex items-center justify-between">
                                      <p className="text-blue-400 font-medium text-lg"></p>
                                      <p className="text-slate-600 font-semibold text-lg">
                                        {displayINRCurrency(
                                          order?.productId.rentprice *
                                            order?.quantity +
                                            order?.productId.securityfee
                                        )}
                                      </p>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="flex items-center justify-between">
                                    <p className="text-slate-600 font-semibold text-lg">
                                      {displayINRCurrency(
                                        order?.productId.price * order?.quantity
                                      )}
                                    </p>
                                    <span className="text-slate-600">
                                      Quantity:-{order?.quantity}
                                    </span>
                                  </div>
                                )}
                              </div>
                              <div className="flex-col gap-3 items-center mt-2">
                                <p className="text-slate-700 font-semibold">
                                  Shipping Address
                                </p>
                                <div className="flex  justify-between">
                                  <p className="capitalize text-slate-500">
                                    {product.usershipping.username}
                                  </p>
                                  <p className="capitalize text-slate-500">
                                    {product.usershipping.phoneNumber}
                                  </p>
                                </div>
                                <p className="text-slate-500">
                                  {product.usershipping.address}{" "}
                                </p>
                                <div className="flex  justify-between">
                                  <p className="capitalize text-slate-500">
                                    {product.usershipping.city}
                                  </p>
                                  <p className="capitalize text-slate-500">
                                    {product.usershipping.pincode}
                                  </p>
                                </div>
                                <div className="flex  justify-between">
                                  <p className="capitalize text-slate-500">
                                    {product.usershipping.state}
                                  </p>
                                  <p className="capitalize text-slate-500">
                                    {product.usershipping.country}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderConfirm;
