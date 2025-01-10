import React, { useContext, useEffect, useState } from "react";
import summeryApi from "../common";
import Context from "../context";
import displayINRCurrency from "../helpers/displayCurrency";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
function Checkout() {
  const [data, setData] = useState([]);
  const [user, setuserid] = useState("");
  const navigate = useNavigate();
  const [address, setAddress] = useState({
    username: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    phoneNumber: "",
  });
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const loadingCart = new Array(context.cartProductCount).fill(null);

  //Add to card view details
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

  //shipping address
  const fectchshipping = async () => {
    try {
      const resp = await fetch(summeryApi.getaddress.url, {
        method: summeryApi.getaddress.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      });
      const respdata = await resp.json();
      setAddress(respdata.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
    fectchshipping();
  }, []);

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

  const totalQty = data.reduce(
    (previousValue, currentValue) => previousValue + currentValue.quantity,
    0
  );
  const totalPrice = data.reduce(
    (prev, curr) => prev + curr.quantity * curr?.productId?.price,
    0
  );

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

  const handlepayment = async () => {
    try {
      const payres = await fetch(summeryApi.payment.url, {
        method: summeryApi.payment.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          amount: total,
          carditem: totalQty,
          userid: data[0].userId,
          usershipping: address,
          data: data,
        }),
      });
      const respaydata = await payres.json();
      const options = {
        key: "rzp_test_YqTP4jNZJuknkg", // Enter the Key ID generated from the Dashboard
        amount: respaydata.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Acme Corp", //your business name
        order_id: respaydata.orderid, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        handler: async function (response) {
          try {
            const api = await fetch(summeryApi.verifypayment.url, {
              method: summeryApi.verifypayment.method,
              credentials: "include",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify({
                Payment_id: response.razorpay_payment_id,
                Order_id: response.razorpay_order_id,
                Razor_Signature: response.razorpay_signature,
                amount: respaydata.amount,
                orderItem: data,
                userId: respaydata.userid,
                usershipping: respaydata.usershipping,
              }),
            });
            const payres = await api.json();
            if (payres.success) {
              toast.success(payres.message);
              navigate("/order-confirm");
            }
          } catch (err) {
            console.log(err);
          }
        },
        prefill: {
          //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
          name: "Kirti Verma", //your customer's name
          email: "kirtiverma19092003@gmail.com",
          contact: "7898834822", //Provide the customer's phone number for better conversion rates
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className=" mx-auto container">
      <div className="text-center text-lg my-3">
        {data.length === 0 && !loading && (
          <p className="text-white py-5">No Data</p>
        )}
      </div>

      <div className="flex flex-col w-full lg:flex-row gap-10  p-4">
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
                    className="w-full bg-white my-2 h-50 border border-slate-300 grid grid-cols-[128px,1fr]   rounded"
                  >
                    <div className="w-32 bg-slate-200 h-full">
                      <img
                        src={product?.productId?.productImage[0]}
                        className="w-full h-full object-scale-down mix-blend-multiply"
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

                      <div>
                        {product.form == "Rent" ? (
                          <div>
                            <p className="text-slate-600">
                              Security Fee: {product?.productId.securityfee}
                            </p>

                            <div className="flex items-center justify-between">
                              <p className="text-red-600 font-medium text-lg">
                                {displayINRCurrency(
                                  product?.productId.rentprice +
                                    product?.productId.securityfee
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

        <div className="flex flex-col w-1/2 h-full gap-4">
          {/* Shipping Address */}
          <div className=" bg-white border mt-2 border-gray-300 rounded">
            <h1 className=" text-white  bg-blue-400 px-4 py-2">
              Shipping Address
            </h1>
            <ul className="p-4 text-slate-600 font-medium flex  flex-col gap-3">
              <li>Username: {address.username}</li>
              <li>Phone Number: {address.phoneNumber}</li>
              <li>Address: {address.address}</li>
              <li>City: {address.city}</li>
              <li>State: {address.state} </li>
              <li>Country: {address.country}</li>
              <li>Pincode: {address.pincode}</li>
            </ul>
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
                  <button
                    onClick={handlepayment}
                    className="bg-blue-600 p-2 text-white w-full text-center"
                  >
                    Proceed to Pay
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Checkout;
