import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import summeryApi from "../common";
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import displayINRCurrency from "../helpers/displayCurrency";
import VerticleCartProduct from "../components/VerticleCartProduct";
import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay";
import RentAddToCart from "../helpers/rentAddtoCart";
import Context from "../context";

function RentProduct() {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
    rent: "",
    securityfee: "",
  });

  const [deliverydate, setdiverydate] = useState("");
  const [size, setsize] = useState([]);
  const [selectedsize, setselectedsize] = useState("");
  const { fetchUserAddToCart } = useContext(Context);
  const params = useParams();
  const [loading, setloading] = useState(true);
  const productImageListLoading = new Array(4).fill(null);
  const [activeImage, setActiveImage] = useState("");
  const naviagte = useNavigate();
  const [zoomImageC, setZoomImageC] = useState({
    x: 0,
    y: 0,
  });

  const [zoomImage, setZoomImage] = useState(false);

  // fetching  product details
  const fetchProductDetails = async () => {
    setloading(true);
    const response = await fetch(summeryApi.productDetails.url, {
      method: summeryApi.productDetails.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        productId: params?.id,
      }),
    });
    setloading(false);
    const dataResponse = await response.json();
    setData(dataResponse?.data);
    setActiveImage(dataResponse?.data?.productImage[0]);
    setsize(dataResponse?.data?.size);
  };

  useEffect(() => {
    fetchProductDetails();
  }, [params]);

  const handleMouseEnterProduct = (imageURL) => {
    setActiveImage(imageURL);
  };

  const handleZoomImage = useCallback(
    (e) => {
      setZoomImage(true);
      const { left, top, width, height } = e.target.getBoundingClientRect();

      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;

      setZoomImageC({
        x,
        y,
      });
    },
    [zoomImageC]
  );

  const handleselectedsize = (size) => {
    setselectedsize(size);
  };

  const handleDeliverydate = (e) => {
    setdiverydate(e.target.value);
  };
  const handleLeaveImageZoom = () => {
    setZoomImage(false);
  };

  const handleupdatevalue = async (e, id) => {
    await RentAddToCart(e, id, selectedsize, deliverydate);
    fetchUserAddToCart();
    naviagte("/cart");
  };

  const handleAddTOCart = async (e, id) => {
    await RentAddToCart(e, id, selectedsize, deliverydate);
    fetchUserAddToCart();
  };

  return (
    <div className="container mx-auto p-4">
      <div className=" min-h-[200px] flex flex-col lg:flex-row gap-8">
        {/* product Image */}
        <div className="h-98 flex flex-col lg:flex-row-reverse gap-4">
          <div className="h-[300px] w-[300px] h-full  lg:w-96 bg-slate-200 relative p-4">
            <img
              src={activeImage}
              className="h-full w-full object-scale-down mix-blend-multiply"
              alt="product-img"
              onMouseMove={handleZoomImage}
              onMouseLeave={handleLeaveImageZoom}
              //  onMouseEnter={handleZoomImage}
            />

            {/* product zoom */}
            {zoomImage && (
              <div className="hidden lg:block absolute min-w-[500px] min-h-[400px] overflow-hidden bg-slate-200 p-1 -right-[510px] top-0">
                <div
                  className="w-full  h-full min-h-[400px] min-w-[500px]  mix-blend-multiply scale-125"
                  style={{
                    backgroundImage: `url(${activeImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: `${zoomImageC.x * 100}% ${
                      zoomImageC.y * 100
                    }%`,
                  }}
                ></div>
              </div>
            )}
          </div>
          <div className="h-full">
            {loading ? (
              <div className="flex  gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {productImageListLoading.map((el, index) => {
                  return (
                    <div
                      className="h-20 w-20 bg-slate-200 rounded animate-pulse"
                      key={"loadingImage" + index}
                    ></div>
                  );
                })}
              </div>
            ) : (
              <div className="flex  gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {data?.productImage?.map((imgURL, index) => {
                  return (
                    <div
                      className="h-20 w-20 bg-slate-200 rounded"
                      key={imgURL}
                    >
                      <img
                        src={imgURL}
                        className="w-full h-full object-scale-down mix-blend-multiply cursor-pointer"
                        alt="product-img"
                        onClick={() => handleMouseEnterProduct(imgURL)}
                        onMouseEnter={() => handleMouseEnterProduct(imgURL)}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        {/* product details */}
        {loading ? (
          <div className="grid gap-1 w-full">
            <p className="bg-slate-200 animate-pulse h-6 lg:h-8 w-full rounded-full inline-block "></p>
            <h2 className="text-3xl lg:text-4xl font-medium h-6 bg-slate-200 animate-pulse w-full lg:h-8 "></h2>
            <p className="capitalize text-slate-400 bg-slate-200 min-w-[100px] animate-pulse h-6 w-full lg:h-8 "></p>
            <div className="bg-slate-200 h-6 animate-pulse flex items-center gap-1"></div>
            <div className="flex items-center gap-2 text-2xl font-medium lg:text-3xl my-1 h-6 animate-pulse">
              <p className="text-red-600 bg-slate-200 w-full lg:h-8 "></p>
              <p className="text-slate-400 line-through  bg-slate-200 w-full lg:h-8 "></p>
            </div>
            <div className="flex items-center gap-3 my-2">
              <button className=" h-6 bg-slate-200 rounded animate-pulse w-full lg:h-8 "></button>
              <button className=" h-6 bg-slate-200 rounded animate-pulse w-full lg:h-8 "></button>
            </div>
            <div>
              <p className="text-slate-600 font-medium my-1 h-6 animate-pulse bg-slate-200 rounded w-full lg:h-8 "></p>
              <p className="h-6 bg-slate-200 rounded animate-pulse w-full lg:h-8 "></p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <p className="bg-slate-200 animate-pulse px-2 rounded-full inline-block w-fit">
              {data?.brandName}
            </p>
            <h2 className="text-3xl lg:text-4xl font-medium">
              {data?.productName}
            </h2>
            <p className="capitalize text-slate-400">{data?.category}</p>
            <div className="text-blue-600 flex items-center gap-1">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalf />
            </div>
            <div className="flex items-center gap-2 text-2xl font-medium lg:text-3xl my-1">
              <p className="text-red-600">
                {displayINRCurrency(data.rentprice)}
              </p>
              <p className="text-slate-400 line-through font-xl font-bold">
                {displayINRCurrency(data.price)}
              </p>
            </div>
            <div>
              <label
                htmlFor="newsize"
                className="text-slate-600 font-xl font-bold my-1"
              >
                Size:
              </label>
              {size.map((size) => (
                <button
                  key={size}
                  onClick={() => handleselectedsize(size)}
                  style={{
                    margin: "5px",
                    padding: "10px",
                    backgroundColor: "white",
                    color: "black",
                    border: "none",
                    cursor: "pointer",
                  }}
                  name="size"
                  id="newsize"
                  value={size}
                  required
                >
                  {size}
                </button>
              ))}
              <p style={{ marginTop: "20px", fontSize: "18px" }}>
                Selected Size: {selectedsize || "None"}
              </p>
            </div>

            <div className="flex items-center gap-1">
              <p className="text-slate-600 font-xl font-bold my-1">
                Security Fees:
              </p>
              <p className="text-blue-400  font-xl font-bold">
                {displayINRCurrency(data.securityfee)}
              </p>
            </div>

            <div className="flex items-center gap-1">
              <p className="text-slate-600 font-xl font-bold my-1">
                Description:
              </p>
              <p>{data?.description}</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-slate-600 font-xl font-bold my-1">
                Delivery date
              </p>
              <input
                type="date"
                placeholder="choose date"
                className="border border-slate-300"
                name="deliverydate"
                value={deliverydate}
                onChange={handleDeliverydate}
                required
              />
            </div>
            <div className="flex items-center gap-3 my-2">
              <button
                onClick={(e) => handleupdatevalue(e, data._id)}
                className="border-2 border-blue-400 rounded px-3 py-1 min-w-[120px] text-blue-400 hover:bg-blue-500 hover:text-white"
              >
                Rent
              </button>
              <button
                onClick={(e) => handleAddTOCart(e, data?._id)}
                className="border-2 border-blue-500 rounded px-3 py-1 min-w-[120px]  bg-blue-500 text-white hover:text-blue-500 hover:bg-slate-100"
              >
                Add To Cart
              </button>
            </div>
            <div className="flex gap-1 flex-row items-center">
              <p className="text-slate-600 font-xl font-bold my-1">Note:-</p>
              <p>You order this product for upto 14 days in advance only</p>
            </div>  
          </div>
        )}
      </div>
      {data.category && (
        <CategoryWiseProductDisplay
          category={data?.category}
          heading={"Recommended Product"}
        />
      )}
    </div>
  );
}

export default RentProduct;
