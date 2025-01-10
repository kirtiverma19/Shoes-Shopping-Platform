import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ProductCategory from "../helpers/productCategory";
import VerticleCart from "../components/VerticleCart";
import summeryApi from "../common";

function CategoryProduct() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const urlSearch = new URLSearchParams(location.search);
  const urlCategoryListArray = urlSearch.getAll("category");

  const [sortBy, setSortBy] = useState("");

  const urlCategoryListObject = {};
  urlCategoryListArray.forEach((el) => {
    urlCategoryListObject[el] = true;
  });

  const [selectCategory, setSelectCategory] = useState({
    urlCategoryListObject,
  });
  const [filterCategoryList, setFilterCategoryList] = useState([]);

  const fetchData = async () => {
    const response = await fetch(summeryApi.filterProduct.url, {
      method: summeryApi.filterProduct.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        category: filterCategoryList,
      }),
    });
    const dataResponse = await response.json();
    console.log(dataResponse.data);
    setData(dataResponse?.data || []);
  };

  const handleSelectCategory = (e) => {
    const { name, value, checked } = e.target;
    setSelectCategory((preve) => {
      return {
        ...preve,
        [value]: checked,
      };
    });
  };

  useEffect(() => {
    fetchData();
  }, [filterCategoryList]);
  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory)
      .map((categoryKeyName) => {
        if (selectCategory[categoryKeyName]) {
          return categoryKeyName;
        }
        return null;
      })
      .filter((el) => el);
    setFilterCategoryList(arrayOfCategory);

    // formal for url change when change on the checkbox
    const urlFormat = arrayOfCategory.map((el, index) => {
      if (arrayOfCategory.length - 1 === index) {
        return `category=${el}`;
      }
      return `category=${el}`;
    });
    navigate("/product-category?" + urlFormat.join(""));
  }, [selectCategory]);

  const handleOnChangeSortBy = (e) => {
    const { value } = e.target;
    setSortBy(value);
    if (value === "asc") {
      setData((preve) => preve.sort((a, b) => a.sellingPrice - b.sellingPrice));
    }

    if (value === "dsc") {
      setData((preve) => preve.sort((a, b) => b.sellingPrice - a.sellingPrice));
    }
  };

  useEffect(() => {}, [sortBy]);

  return (
    <div className="container mx-auto p-4">
      {/* desktop version */}
      <div className="hidden lg:grid grid-cols-[200px,1fr]">
        {/* left side */}
        <div className="bg-white p-2 min-h-[calc(100vh-100px)] overflow-y-scroll">
          {/* sort by */}
          <div className="">
            <h3 className="text-base uppercase  font-medium text-slate-500 border-b pb-1 border-slate-300">
              Sort By
            </h3>
            <form className="text-sm flex flex-col gap-2 py-2">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  value={"asc"}
                  onChange={handleOnChangeSortBy}
                  checked={sortBy === "asc"}
                />
                <label>Price - Low To High </label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  value={"dsc"}
                  onChange={handleOnChangeSortBy}
                  checked={sortBy === "dsc"}
                />
                <label>Price - High To Low </label>
              </div>
            </form>
          </div>

          {/* filter by */}
          <div className="">
            <h3 className="text-base uppercase  font-medium text-slate-500 border-b pb-1 border-slate-300">
              Category
            </h3>
            <form className="text-sm flex flex-col gap-2 py-2">
              {ProductCategory.map((categoryName, index) => {
                return (
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      name={"category"}
                      checked={selectCategory[categoryName?.value]}
                      id={categoryName?.value}
                      onChange={handleSelectCategory}
                      value={categoryName?.value}
                    />
                    <label htmlFor={categoryName?.value}>
                      {categoryName?.label}
                    </label>
                  </div>
                );
              })}
            </form>
          </div>
        </div>
        {/* right side */}
        <div className="px-4">
          <p className="font-medium text-slate-800 text-lg my-2">
            Search Results:{data.length}
          </p>
          <div className="min-h[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]">
            {data.length !== 0 && (
              <VerticleCart data={data} loading={loading} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryProduct;
