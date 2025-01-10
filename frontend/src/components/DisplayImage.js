import React from "react";
import { MdClose } from "react-icons/md";
const DisplayImage = ({ imgUrl, onClose }) => {
  return (
    <div className="fixed bottom-0 right-0 left-0 top-0 flex justify-center items-center">
      <div className="bg-white rounded shadow-lg max-w-5xl  mx-auto p-4">
        <div
          className="w-fit  ml-auto text-2xl cursor-pointer hover:text-red-600"
          onClick={onClose}
        >
          <MdClose />
        </div>
        <div className="flex justify-center p-4 max-w-[80vh] max-h-[80vh]">
          <img src={imgUrl} className="w-full " />
        </div>
      </div>
    </div>
  );
};

export default DisplayImage;
