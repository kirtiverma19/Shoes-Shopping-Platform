import React, { useEffect, useState } from "react";
import summeryApi from "../common";
import moment from "moment";
import displayINRCurrency from "../helpers/displayCurrency";
function AdminOrderDisplay() {
  const [loading, setloading] = useState(true);
  const [data, setData] = useState([]);
  const [productdetail, setproductdetail] = useState([]);
  const fetchProductDetails = async () => {
    setloading(true);
    const response = await fetch(summeryApi.AllOrder.url, {
      method: summeryApi.AllOrder.method,
    });
    setloading(false);
    const dataResponse = await response.json();
    setData(dataResponse.ord);
  };
  useEffect(() => {
    fetchProductDetails();
  }, []);
  return (
    <div className="p-10">
      {!data[0] && <p>No Order available</p>}
      <div>
        {data.map((item, index) => {
          return (
            <div key={item.userId + index}>
              <p className="font-semibold text-lg">
                {moment(item.orderDate).format("LL")}
              </p>
              <div className="grid gap-1 ">
                {item?.orderItem?.map((product, index) => {
                  return (
                    <div className=" justify-between flex bg-slate-200 ">
                      <div className="flex  gap-3">
                        {
                          <img
                            src={product?.productId.productImage[0]}
                            className="w-32 h-32 object-scale-down p-2"
                          />
                        }
                        <div>
                          <div className="font-medium text-lg text-ellipsis line-clamp-1">
                            {product?.productId.productName}
                          </div>
                          <div className="text-slate-500"> {item.usershipping.username}</div>
                          <div className="text-blue-600">{product?.form}</div>
                          {product?.form == "Rent" ? (
                            <div className="flex j items-center gap-5 mt-1">
                              <div className="text-red-500">
                                {displayINRCurrency(
                                  product?.productId.rentprice +
                                    product?.productId.securityfee
                                )}
                              </div>
                              <p> Quantity:{product?.quantity}</p>

                              <p>
                                Delivered date:
                                {moment(item.product?.deliverydate).format("L")}
                              </p>
                            </div>
                          ) : (
                            <div className="flex items-center gap-5 mt-1">
                              <div className="text-red-500">
                                {displayINRCurrency(
                                  product?.productId.sellingPrice
                                )}{" "}
                              </div>{" "}
                              <p> Quantity:{product?.quantity}</p>
                            </div>
                          )}
                          <div>Size:-{product?.size}</div>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="font-medium">Payment Details</div>
                        <p>
                          <span className="font-medium">Payment_id:</span>{" "}
                          {item.Payment_id}
                        </p>
                        <p>
                          <span className="font-medium">Payment status:</span>{" "}
                          {item.payStatus}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AdminOrderDisplay;
