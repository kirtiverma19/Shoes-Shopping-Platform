import React, { useContext, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import summeryApi from "../common/index";
import { toast } from "react-toastify";
import Context from "../context";
import { GrUpdate } from "react-icons/gr";

function UpdatePassword() {
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");

  const naviagte = useNavigate();

  const passwordChange = (e) => {
    setpassword(e.target.value);
  };
  const confirmpasswordchange = (e) => {
    setconfirmpassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resp = await fetch(summeryApi.updatePassword.url, {
        method: summeryApi.updatePassword.method,
        body: JSON.stringify({
          password,
          confirmpassword,
          token: localStorage.getItem("passToken"),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await resp.json();
      if (result.success) {
        console.log(result);
        toast.success(result.message);
        naviagte("/login");
      }
      if (result.error) {
        toast.error(result.message);
      }
    } catch (err) {}
  };

  return (
    <div>
      <section id="login">
        <div className="mx-auto container p-4">
          <div className="bg-white p-5 py-2 w-full max-w-sm mx-auto">
            <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full flex  flex-col items-center justify-center">
              <div>
                <GrUpdate className="text-2xl text-blue-400" />
              </div>
            </div>
            <p className="text-center text-xl font-bold text-blue-400">Update Password</p>
            <form className="pt-6 flex flex-col gap-2 " onSubmit={handleSubmit}>
              <div>
                <label>New Password:</label>
                <div className="bg-slate-100 p-2">
                  <input
                    type="password"
                    placeholder="enter password"
                    name="password"
                    className="w-full h-full outline-none bg-transparent"
                    required
                    onChange={passwordChange}
                  />
                </div>
              </div>
              <div>
                <label>Confirm Password:</label>
                <div className="bg-slate-100 p-2 flex">
                  <input
                    type="password"
                    placeholder="enter confirm password"
                    className="w-full h-full outline-none bg-transparent"
                    name="confirmpassword"
                    required
                    onChange={confirmpasswordchange}
                  />
                </div>
              </div>
              <div className="flex items-center justify-center mt-3">
                <button className="bg-blue-400 text-white  hover:scale-110 transition-all rounded-full p-2 w-40">
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
export default UpdatePassword;
