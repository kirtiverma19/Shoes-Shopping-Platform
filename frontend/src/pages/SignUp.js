import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import imagetobase64 from "../helpers/imagetobase64";
import summeryApi from "../common/index";
import { toast } from "react-toastify";
function SignUp() {
  const [showPassowrd, setShowPassowrd] = useState(false);
  const [showconfirmPassowrd, setshowconfirmPassowrd] = useState(false);
  const [data, setdata] = useState({
    email: "",
    password: "",
    username: "",
    confirmPassword: "",
    profilePic: "",
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

  const handleuploadpic = async (e) => {
    const file = e.target.files[0];

    const imagePic = await imagetobase64(file);
    console.log("imagepic", imagePic);
    setdata((prev) => {
      return {
        ...prev,
        profilePic: imagePic,
      };
    });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    if (data.password === data.confirmPassword) {
      const dataResponse = await fetch(summeryApi.signUp.url, {
        method: summeryApi.signUp.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        toast.success(dataApi.message);
        navigate("/login");
      }
      if (dataApi.error) {
        toast.error(dataApi.message);
      }
    } else {
      toast.error("Please check password and confirm password");
     
    }
  };
  return (
    <section id="signup">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 py-2 w-full max-w-sm mx-auto">
          <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full flex  flex-col items-center justify-center">
            <div>
              <img src={data.profilePic || <FaUserCircle />} />
            </div>
            <form>
              <label className="flex items-center justify-center w-full">
                <div className="text-xs bg-opacity-75 bg-slate-200 py-2 cursor-pointer text-center absolute bottom-0 w-full">
                  Upload pic
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleuploadpic}
                  name="profilePic"
                />
              </label>
            </form>
          </div>
          <form className="pt-6 flex flex-col gap-2" onSubmit={handlesubmit}>
            <div className="grid">
              <label>Email:</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="email"
                  placeholder="enter email"
                  name="email"
                  value={data.email}
                  onChange={handleOnChange}
                  className="w-full h-full outline-none bg-transparent"
                  required
                />
              </div>
            </div>
            <div className="grid">
              <label>Username:</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="text"
                  placeholder="enter username"
                  name="username"
                  value={data.username}
                  onChange={handleOnChange}
                  className="w-full h-full outline-none bg-transparent"
                  required
                />
              </div>
            </div>
            <div className="grid">
              <label>Password:</label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showPassowrd ? "text" : "password"}
                  placeholder="enter password"
                  className="w-full h-full outline-none bg-transparent"
                  name="password"
                  value={data.password}
                  onChange={handleOnChange}
                  required
                />
                <div
                  className="cursor-pointer"
                  onClick={() => setShowPassowrd((prev) => !prev)}
                >
                  <span>{showPassowrd ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
            </div>
            <div className="grid">
              <label> Confirm Password:</label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showconfirmPassowrd ? "text" : "password"}
                  placeholder="enter confirm password"
                  className="w-full h-full outline-none bg-transparent"
                  name="confirmPassword"
                  value={data.confirmPassword}
                  onChange={handleOnChange}
                  required
                />
                <div
                  className="cursor-pointer"
                  onClick={() => setshowconfirmPassowrd((prev) => !prev)}
                >
                  <span>
                    {showconfirmPassowrd ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            </div>
            <button className="bg-blue-400 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6">
              Signup
            </button>
          </form>
          <p className="py-4">
            Already have account?
            <Link to={"/login"} className="hover:text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
