import React, { useContext, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import summeryApi from "../common/index";
import { toast } from "react-toastify";
import Context from "../context";
import { MdAttachEmail } from "react-icons/md";

function ForgetPassword() {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(summeryApi.forgetPassword.url, {
      method: summeryApi.forgetPassword.method,
      body: JSON.stringify({ email }),
      headers: {
        "content-type": "application/json",
      },
    });

    const dataresponse = await response.json();
    if (dataresponse.success) {
      toast.success(dataresponse.message);
      localStorage.setItem("passToken", dataresponse?.token);
      localStorage.setItem("email", email);
      navigate("/verifyOpt");
    }
    if (dataresponse.error) {
      toast.error(dataresponse.message);
    }
  };
  return (
    <section id="login">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 py-2 w-full max-w-sm mx-auto">
          <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full flex  flex-col items-center justify-center">
            <div>
              <MdAttachEmail className="text-5xl text-blue-400" />
            </div>
          </div>
          <p className="text-xl text-center font-bold text-blue-400">Forget your password</p>
          <form className="pt-6 flex flex-col gap-2" onSubmit={handlesubmit}>
            <div>
              <label>Enter Email:</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="email"
                  placeholder="enter email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-full outline-none bg-transparent"
                  required
                />
              </div>
            </div>
            <div className="flex">
              <p className="ml-52">You want to</p>
              <Link
                to={"/login"}
                className="block w-fit ml-auto hover:underline hover:text-blue-400"
              >
                Login?
              </Link>
            </div>

            <div>
              <button className="bg-blue-400 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6">
                Send OTP
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ForgetPassword;
