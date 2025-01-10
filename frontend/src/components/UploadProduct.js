import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import ProductCategory from "../helpers/productCategory.js";
import { FaUpload } from "react-icons/fa6";
import uploadImage from "../helpers/uploadImage.js";
import DisplayImage from "./DisplayImage";
import summeryApi from "../common/index.js";
import { toast } from "react-toastify";
function UploadProduct({ onClose, fetchdata }) {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    size: [],
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
    rentprice: "",
    securityfee: "",
  });

  const [openfullScreenImg, setopenfullScreenImg] = useState(false);
  const [fullScreenImg, setfullScreenImg] = useState("");

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];

    const uploadImageCloudinary = await uploadImage(file);
    setData((prev) => {
      return {
        ...prev,
        productImage: [...prev.productImage, uploadImageCloudinary.url],
      };
    });
  };

  const handleDeleteProductImage = async (index) => {
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);
    setData((prev) => {
      return {
        ...prev,
        productImage: [...newProductImage],
      };
    });
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handlecheckbox = (e) => {
    const { value, checked } = e.target;
    const { size } = data;
    if (checked) {
      setData({ ...data, size: [...size, value] });
    } else {
      setData({
        ...data,
        size: size.filter((siz) => siz !== value),
      });
    }
  };
  // upload product
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(summeryApi.uploadProduct.url, {
      method: summeryApi.uploadProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    if (responseData.success) {
      toast.success(responseData?.message);
      onClose();
      fetchdata();
    }
    if (responseData.error) {
      toast.error(responseData?.message);
    }
  };
  return (
    <div className="fixed bg-slate-200 bg-opacity-35 w-full h-full top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center pb-3">
          <h2 className="font-bold text-lg">Upload Product</h2>
          <div
            className="w-fit  ml-auto text-2xl cursor-pointer hover:text-blue-600"
            onClick={onClose}
          >
            <MdClose />
          </div>
        </div>
        <form
          className="grid p-4 gap-2  overflow-y-scroll h-full"
          onSubmit={handleSubmit}
        >
          <label htmlFor="productName">Product Name:</label>
          <input
            type="text"
            id="productName"
            name="productName"
            placeholder="enter product name"
            value={data.productName}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />
          <label htmlFor="brandName" className="mt-3">
            brand Name:
          </label>
          <input
            type="text"
            id="brandName"
            name="brandName"
            placeholder="enter brand name"
            value={data.brandName}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />
          <label htmlFor="category" className="mt-3">
            Category:
          </label>
          <select
            required
            value={data.category}
            name="category"
            className="p-2 bg-slate-100 border rounded"
            onChange={handleOnChange}
          >
            <option value={""}>Select Category</option>
            {ProductCategory.map((el, index) => {
              return (
                <option value={el.value} key={el.value + index}>
                  {el.label}
                </option>
              );
            })}
          </select>
          <label htmlFor="productImage" className="mt-3">
            Product Image:
          </label>
          <label htmlFor="uploadimage">
            <div className="p-2 bg-slate-100 border rounded h-32 w-full  flex justify-center items-center cursor-pointer">
              <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                <span className="text-4xl">
                  <FaUpload />
                </span>
                <p className="text-sm">Upload Product Image</p>
                <input
                  type="file"
                  id="uploadimage"
                  className="hidden"
                  onChange={handleUploadProduct}
                />
              </div>
            </div>
          </label>
          <div>
            {data?.productImage[0] ? (
              <div className="flex items-center gap-2">
                {data.productImage.map((el, index) => {
                  return (
                    <div className="relative group">
                      <img
                        src={el}
                        alt={el}
                        width={80}
                        height={80}
                        className="bg-slate-100 border"
                        onClick={() => {
                          setopenfullScreenImg(true);
                          setfullScreenImg(el);
                        }}
                      />
                      <div
                        className="absolute top-0 right-0 p-1 text-xl rounded-full hidden group-hover:block cursor-pointer"
                        onClick={() => handleDeleteProductImage(index)}
                      >
                        <MdDelete />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-red-600 text-xs">
                Please Upload Product Image
              </p>
            )}
          </div>
          <label htmlFor="size" className="mt-3">
            Size:
          </label>
          <div className="flex flex-row  items-center gap-5">
            <div className="flex flex-row items-center justify-center gap-1">
              <input
                type="checkbox"
                id="size"
                name="size"
                placeholder="enter size"
                value="10"
                checked={data.size.includes("10")}
                onChange={handlecheckbox}
                className="p-2 bg-slate-100 border rounded h-5 w-5"
              />
              <label htmlFor="size" className="text-xl">
                10
              </label>
            </div>

            <div className="flex flex-row items-center justify-center gap-1">
              <input
                type="checkbox"
                id="size"
                name="size"
                placeholder="enter size"
                value="11"
                checked={data.size.includes("11")}
                onChange={handlecheckbox}
                className="p-2 bg-slate-100 border rounded h-5 w-5"
              />
              <label htmlFor="size" className="text-xl">
                11
              </label>
            </div>
            <div className="flex flex-row items-center justify-center gap-1">
              <input
                type="checkbox"
                id="size"
                name="size"
                placeholder="enter size"
                value="12"
                checked={data.size.includes("12")}
                onChange={handlecheckbox}
                className="p-2 bg-slate-100 border rounded h-5 w-5"
              />
              <label htmlFor="size" className="text-xl">
                12
              </label>
            </div>
            <div className="flex flex-row items-center justify-center gap-1">
              <input
                type="checkbox"
                id="size"
                name="size"
                placeholder="enter size"
                value="13"
                checked={data.size.includes("13")}
                onChange={handlecheckbox}
                className="p-2 bg-slate-100 border rounded h-5 w-5"
              />
              <label htmlFor="size" className="text-xl">
                13
              </label>
            </div>
            <div className="flex flex-row items-center justify-center gap-1">
              <input
                type="checkbox"
                id="size"
                name="size"
                placeholder="enter size"
                value="14"
                checked={data.size.includes("14")}
                onChange={handlecheckbox}
                className="p-2 bg-slate-100 border rounded h-5 w-5"
              />
              <label htmlFor="size" className="text-xl">
                14
              </label>
            </div>
            <div className="flex flex-row items-center justify-center gap-1">
              <input
                type="checkbox"
                id="size"
                name="size"
                placeholder="enter size"
                value="15"
                checked={data.size.includes("15")}
                onChange={handlecheckbox}
                className="p-2 bg-slate-100 border rounded h-5 w-5"
              />
              <label htmlFor="size" className="text-xl">
                15
              </label>
            </div>
          </div>

          <label htmlFor="rentprice" className="mt-3">
            Rental Prices:
          </label>
          <input
            type="number"
            id="rentprice"
            name="rentprice"
            placeholder="enter rent price"
            value={data.rentprice}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />
          <label htmlFor="securityfee" className="mt-3">
            Security Fees:
          </label>
          <input
            type="number"
            id="securityfee"
            name="securityfee"
            placeholder="enter security fee"
            value={data.securityfee}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />
          <label htmlFor="price" className="mt-3">
            Price:
          </label>
          <input
            type="number"
            id="price"
            name="price"
            placeholder="enter price"
            value={data.price}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />
          <label htmlFor="sellingPrice" className="mt-3">
            Selling Price:
          </label>
          <input
            type="number"
            id="sellingPrice"
            name="sellingPrice"
            placeholder="enter selling price"
            value={data.sellingPrice}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />
          <label htmlFor="description" className="mt-3">
            Description:
          </label>
          <textarea
            className=" h-28 bg-slate-100 border resize-none p-1"
            placeholder="enter product description"
            cols={5}
            rows={3}
            name="description"
            onChange={handleOnChange}
          ></textarea>
          <button className="px-3 py-2 bg-blue-400 text-white mb-10 hover:bg-blue-500">
            Upload Product
          </button>
        </form>
      </div>

      {/* display image full screen */}
      {openfullScreenImg && (
        <DisplayImage
          onClose={() => setopenfullScreenImg(false)}
          imgUrl={fullScreenImg}
        />
      )}
    </div>
  );
}

export default UploadProduct;
