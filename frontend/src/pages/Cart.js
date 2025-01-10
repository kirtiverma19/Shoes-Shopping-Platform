import React, { useContext, useEffect, useState } from "react";
import summeryApi from "../common";
import Context from "../context";
import displayINRCurrency from "../helpers/displayCurrency";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import moment from "moment";
function Cart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const loadingCart = new Array(context.cartProductCount).fill(null);
  const [userid, setuserid] = useState();

  //fetch Cart  product
  const fetchData = async () => {
    setLoading(true);
    const response = await fetch(summeryApi.addToCartProductView.url, {
      method: summeryApi.addToCartProductView.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });
    setLoading(false);
    const responseData = await response.json();
   
    if (responseData.success) {
      setData(responseData.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  //IncreaseQty

  const increaseQty = async (id, qty) => {
    const response = await fetch(summeryApi.updateCartProduct.url, {
      method: summeryApi.updateCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
        quantity: qty + 1,
      }),
    });
    const responseData = await response.json();
    if (responseData.success) {
      fetchData();
    }
  };

  // decreaseQty
  const decreaseQty = async (id, qty) => {
    if (qty >= 2) {
      const response = await fetch(summeryApi.updateCartProduct.url, {
        method: summeryApi.updateCartProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
          quantity: qty - 1,
        }),
      });
      const responseData = await response.json();
      if (responseData.success) {
        fetchData();
      }
    }
  };

  // Delete a Particular cart item
  const deleteCartProduct = async (id) => {
    const response = await fetch(summeryApi.deleteCartProduct.url, {
      method: summeryApi.deleteCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
      }),
    });
    const responseData = await response.json();
    if (responseData.success) {
      fetchData();
      context.fetchUserAddToCart();
    }
  };

  //find totalQty
  const totalQty = data.reduce(
    (previousValue, currentValue) => previousValue + currentValue.quantity,
    0
  );

  //find totalPrice
  // const totalPrice = data.reduce(
  //   (prev, curr) => prev + curr.quantity * curr?.productId?.price,
  //   0
  // );

  // const totalrent = data.reduce(
  //   (prev, curr) =>
  //     prev +
  //     curr.quantity * curr?.productId?.rentprice +
  //     curr?.productId?.securityfee,
  //   0
  // );
  var costrent = 0;
  var actualcost = 0;
  const cost = data.map((product, index) => {
    if (product.form == "Rent") {
      costrent =
        product?.productId?.rentprice * product.quantity +
        product?.productId?.securityfee;
    } else {
      actualcost = product.quantity * product?.productId?.price;
    }
  });

  const total = costrent + actualcost;
  return (
    <div className="mx-auto container">
      <div className="text-center text-lg my-3">
        {data.length === 0 && !loading && (
          <Link to="/" className="text-slate-500 cursor-pointer  py-5">
            Go to shop
          </Link>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-10 lg:justify-between p-10">
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
                  <div
                    key={product?._id + "Add To Cart Loading"}
                    className="w-full bg-white my-2  border border-slate-300 grid grid-cols-[128px,1fr]   rounded"
                  >
                    <div className="w-32 h-full bg-slate-200">
                      <img
                        src={product?.productId?.productImage[0]}
                        className="w-full h-full "
                        alt="product-img"
                      />
                    </div>

                    <div className="px-4 py-2  relative">
                      <div
                        onClick={() => deleteCartProduct(product?._id)}
                        className="absolute right-0 text-blue-400 rounded-full p-4 hover:bg-blue-500 hover:text-white cursor-pointer"
                      >
                        <MdDelete />
                      </div>
                      <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1">
                        {product?.productId?.productName}
                      </h2>
                      <p className="capitalize text-slate-500">
                        {product?.productId?.category}
                      </p>
                      <p className="capitalize text-slate-500">
                        Size:
                        {product?.size}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-blue-400 font-medium text-lg">
                          {product?.form}
                        </p>
                        {product?.form == "Rent" ? (
                          <p>{moment(product?.deliverydate).format("L")}</p>
                        ) : (
                          <p></p>
                        )}
                      </div>

                      <div>
                        {product.form == "Rent" ? (
                          <div>
                            <p className="text-slate-600">
                              Security Fee: {product?.productId.securityfee}
                            </p>

                            <div className="flex items-center justify-between">
                              <p className="text-red-600 font-medium text-lg">
                                {displayINRCurrency(
                                  product?.productId.rentprice
                                )}
                              </p>
                              <p className="text-slate-600 font-semibold text-lg">
                                {displayINRCurrency(
                                  product?.productId.rentprice *
                                    product?.quantity +
                                    product?.productId.securityfee
                                )}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between">
                            <p className="text-red-600 font-medium text-lg">
                              {displayINRCurrency(product?.productId.price)}
                            </p>
                            <p className="text-slate-600 font-semibold text-lg">
                              {displayINRCurrency(
                                product?.productId.price * product?.quantity
                              )}
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="flex gap-3 items-center mt-2">
                        <button
                          onClick={() =>
                            decreaseQty(product?._id, product?.quantity)
                          }
                          className="p-1 border border-blue-400 rounded hover:bg-blue-500 hover:text-white text-blue-400 h-6 w-6 flex justify-center items-center"
                        >
                          -
                        </button>
                        <span>{product?.quantity}</span>
                        <button
                          className="p-1 border border-blue-400 rounded hover:bg-blue-500 hover:text-white text-blue-400 h-6 w-6 flex justify-center items-center"
                          onClick={() =>
                            increaseQty(product?._id, product?.quantity)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>

        {/* summery */}
        {data.length !== 0 && !loading && (
          <div className="mt-5 lg:mt-0 w-full max-w-sm">
            {loading ? (
              <div className="h-36 bg-slate-200 border border-slate-300 animate-pulse"></div>
            ) : (
              <div className="h-36 bg-white flex justify-between flex-col">
                <h2 className="text-white bg-red-600 px-4 py-1">Summary</h2>
                <div className="flex justify-between items-center px-4 gap-2 font-medium text-slate-600">
                  <p>Quantity</p>
                  <p>{totalQty}</p>
                </div>
                <div className="flex justify-between items-center px-4 gap-2 font-medium text-slate-600">
                  <p>Total Price</p>
                  <p>{displayINRCurrency(total)}</p>
                </div>
                <Link
                  to={`/address`}
                  className="bg-blue-600 p-2 text-white w-full text-center"
                >
                  Checkout
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
