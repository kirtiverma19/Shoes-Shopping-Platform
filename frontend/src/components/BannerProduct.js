import React, { useEffect, useState } from "react";
import image1 from "../assest/Banner/bg-1.webp";
import image2 from "../assest/Banner/bg-2.jpg";
import image3 from "../assest/Banner/bg-3.jpeg";
import image4 from "../assest/Banner/bg-4.jpg";
import image5 from "../assest/Banner/img4.webp";
import image6 from "../assest/Banner/img5.webp";
import image7 from "../assest/Banner/img6.jpg";
import image8 from "../assest/Banner/img3.jpg";

import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
function BannerProduct() {
  const [currentImage, setcurrentImage] = useState(0);
  const desktopImages = [image2, image3, image6, image5, image8];

  const customstyle = {
    height: "150px",
    width: "100px",
  };

  const nextImg = () => {
    if (desktopImages.length - 1 > currentImage) {
      setcurrentImage((prev) => prev + 1);
    }
  };

  const prevImg = () => {
    if (currentImage != 0) {
      setcurrentImage((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const intervel = setInterval(() => {
      if (desktopImages.length - 1 > currentImage) {
        nextImg();
      } else {
        setcurrentImage(0);
      }
    }, 5000);
    return () => clearInterval(intervel);
  }, [currentImage]);

  return (
    <div className="container mt-2 mx-auto px-4 rounded ">
      <div className="h-96 w-full bg-slate-200 relative ">
        <div className="absolute z-10 h-full w-full md:flex items-center hidden ">
          <div className=" flex justify-between w-full text-2xl">
            <button
              onClick={prevImg}
              className="bg-white shadow-md rounded-full p-1 "
            >
              <FaAngleLeft />
            </button>
            <button
              onClick={nextImg}
              className="bg-white shadow-md rounded-full p-1"
            >
              <FaAngleRight />
            </button>
          </div>
        </div>
        <div className="flex h-full w-full overflow-hidden">
          {desktopImages.map((imgURL, index) => {
            return (
              <div
                className="h-full w-full  min-w-full min-h-full transition-all "
                key={imgURL}
                style={{ transform: `translateX(-${currentImage * 100}%)` }}
              >
                <img src={imgURL} className="w-full h-full" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default BannerProduct;
