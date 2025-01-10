import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import imagetobase64 from "../helpers/imagetobase64";
import summeryApi from "../common/index";
import { toast } from "react-toastify";
import { IoHome } from "react-icons/io5";
function Address() {
  const [data, setdata] = useState({
    username: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    phoneNumber: "",
  });
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setdata((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    const dataresponse = await fetch(summeryApi.Address.url, {
      method: summeryApi.Address.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const dataApi = await dataresponse.json();
    if (dataApi.success) {
      navigate("/checkout");
      toast.success(dataApi.message);
    }
    if (dataApi.error) {
      toast.error(dataApi.message);
    }
  };

  return (
    <section id="signup">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 py-2 w-full max-w-sm mx-auto">
          <div className="flex items-center justify-center">
            <IoHome className="text-5xl text-blue-400" />
          </div>

          <form className="pt-6 flex flex-col gap-2">
            <div className="grid">
              <label>Username:</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="text"
                  placeholder="enter fullname"
                  name="username"
                  value={data.username}
                  onChange={handleOnChange}
                  className="w-full h-full outline-none bg-transparent"
                  required
                />
              </div>
            </div>
            <div className="grid">
              <label>Address:</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="text"
                  placeholder="enter address"
                  name="address"
                  value={data.address}
                  onChange={handleOnChange}
                  className="w-full h-full outline-none bg-transparent"
                  required
                />
              </div>
            </div>
            <div className="grid">
              <label>city:</label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type="text"
                  placeholder="enter city"
                  className="w-full h-full outline-none bg-transparent"
                  name="city"
                  value={data.city}
                  onChange={handleOnChange}
                  required
                />
              </div>
            </div>
            <div className="grid">
              <label> State:</label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type="text"
                  placeholder="enter state"
                  className="w-full h-full outline-none bg-transparent"
                  name="state"
                  value={data.state}
                  onChange={handleOnChange}
                  required
                />
              </div>
            </div>
            <div className="grid">
              <label> Country:</label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type="text"
                  placeholder="enter country"
                  className="w-full h-full outline-none bg-transparent"
                  name="country"
                  value={data.country}
                  onChange={handleOnChange}
                  required
                />
              </div>
            </div>
            <div className="grid">
              <label> Pincode:</label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type="Number"
                  placeholder="enter state"
                  className="w-full h-full outline-none bg-transparent"
                  name="pincode"
                  value={data.pincode}
                  onChange={handleOnChange}
                  required
                />
              </div>
            </div>
            <div className="grid">
              <label> Phone Number:</label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type="Number"
                  placeholder="enter phone number"
                  className="w-full h-full outline-none bg-transparent"
                  name="phoneNumber"
                  value={data.phoneNumber}
                  onChange={handleOnChange}
                  required
                />
              </div>
            </div>
            <div className="flex ">
              <button
                onClick={handlesubmit}
                className="bg-blue-400 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6"
              >
                Payment
              </button>
              <Link
                to={"/checkout"}
                className="bg-blue-400 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6"
              >
                Old Address
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Address;
