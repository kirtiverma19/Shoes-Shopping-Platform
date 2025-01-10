import React, { useContext, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import summeryApi from "../common/index";
import { toast } from "react-toastify";
import Context from "../context";

function Login() {
  const [showPassowrd, setShowPassowrd] = useState(false);
  const [profilepic, setprofilepic] = useState(false);
  const [data, setdata] = useState({
    email: "",
    password: "",
    profilePic: "",
  });

  const navigate = useNavigate();
  const {fetchUserDetails,fetchUserAddToCart} = useContext(Context);

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
    const dataresponse = await fetch(summeryApi.signIn.url, {
      method: summeryApi.signIn.method,
      credentials:'include',
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const dataApi = await dataresponse.json();

    if (dataApi.success) {
      toast.success(dataApi.message);
     navigate("/");
     fetchUserDetails()
     fetchUserAddToCart()
    }
    if (dataApi.error) {
      toast.error(dataApi.message);
    }
  };
  return (
    <section id="login">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 py-2 w-full max-w-sm mx-auto">
          <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full flex  flex-col items-center justify-center">
            <div>
              <FaUserCircle className="text-5xl" />
            </div>
          </div>
          <form className="pt-6 flex flex-col gap-2" onSubmit={handlesubmit}>
            <div>
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
            <div>
              <label>Password:</label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showPassowrd ? "text" : "password"}
                  placeholder="enter password"
                  className="w-full h-full outline-none bg-transparent"
                  name="password"
                  value={data.password}
                  required
                  onChange={handleOnChange}
                />
                <div
                  className="cursor-pointer"
                  onClick={() => setShowPassowrd((prev) => !prev)}
                >
                  <span>{showPassowrd ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
              <Link
                to={"/forget-password"}
                className="block w-fit ml-auto hover:underline hover:text-blue-500"
              >
                Forget password?
              </Link>
            </div>
            <button className="bg-blue-400 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6">
              Login
            </button>
          </form>
          <p className="py-4">
            Don't have account?{" "}
            <Link
              to={"/sign-up"}
              className="hover:text-blue-700 hover:underline"
            >
              Signup
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Login;
