import React, { useEffect, useState } from "react";
import UploadProduct from "../components/UploadProduct";
import summeryApi from "../common";
import AdminProductCard from "../components/AdminProductCard";

function Products() {
  const [openUplaoadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);
  const fetchAllProduct = async () => {
    const response = await fetch(summeryApi.allProduct.url, {
      method: "get",
    });
    const dataResponse = await response.json();

    setAllProduct(dataResponse?.data || []);
  };
  useEffect(() => {
    fetchAllProduct();
  }, []);
  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center  ">
        <h2 className="font-bold text-lg">All Product</h2>
        <button
          onClick={() => setOpenUploadProduct(true)}
          className="border-2 py-1 px-3 rounded-full border-blue-400 transition-all text-blue-400 hover:bg-blue-500 hover:text-white"
        >
          Upload Product
        </button>
      </div>
      {/* all Product */}
      <div className="flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)]  overflow-y-scroll ">
        {allProduct.map((product, index) => {
          return (
            <AdminProductCard
              data={product}
              key={index + "allProduct"}
              fetchdata={fetchAllProduct}
            />
          );
        })}
      </div>

      {/* upload product  componenet*/}
      {openUplaoadProduct && (
        <UploadProduct
          onClose={() => setOpenUploadProduct(false)}
          fetchdata={fetchAllProduct}
        />
      )}
    </div>
  );
}

export default Products;
