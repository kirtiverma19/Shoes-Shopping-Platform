import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import summeryApi from "../common/index";
import { toast } from "react-toastify";
import Context from "../context";
import { IoFingerPrint } from "react-icons/io5";
import React, { useEffect, useRef, useState } from "react";
import Timer from "./Timer";

const VerifyOpt = () => {
  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();
  const ref5 = useRef();
  const ref6 = useRef();
  const naviagte = useNavigate();

  const inputRef = [ref1, ref2, ref3, ref4, ref5, ref6];
  const [isexpire, setIsExpire] = useState(false);
  const [otpTime, setOtpTime] = useState(null);
  const [opt1, setotp1] = useState("");
  const [opt2, setotp2] = useState("");
  const [opt3, setotp3] = useState("");
  const [opt4, setotp4] = useState("");
  const [opt5, setotp5] = useState("");
  const [opt6, setotp6] = useState("");

  const optArray = [setotp1, setotp2, setotp3, setotp4, setotp5, setotp6];
  useEffect(() => {
    if (ref1.current) {
      ref1.current.focus();
    }
  }, []);

  const inputChange = (event, location) => {
    if (location < 5 && event.target.value) {
      inputRef[location + 1].current.focus();
    }
    optArray[location](event.target.value);
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    const finalOpt = opt1 + opt2 + opt3 + opt4 + opt5 + opt6;

    try {
      const response = await fetch(summeryApi.verifyOtp.url, {
        method: summeryApi.verifyOtp.method,
        body: JSON.stringify({ otp: finalOpt }),
        headers: {
          "content-type": "application/json",
        },
      });

      const responseData = await response.json();
      if (responseData.success) {
        toast.success(responseData.message);
        naviagte("/update-password");
      }
      if (responseData.error) {
        toast.error(responseData.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    const getTime = async () => {
      try {
        const response2 = await fetch(summeryApi.getOtpTime.url, {
          method: summeryApi.getOtpTime.method,
          body: JSON.stringify({ token: localStorage.getItem("passToken") }),
          headers: {
            "content-type": "application/json",
          },
        });
        const resData = await response2.json();
        if (resData.success) {
          const remainingTime =
            new Date(resData?.sendTime).getTime() - new Date().getTime();

          if (remainingTime > 0) {
            setOtpTime(remainingTime);
          } else {
            setIsExpire(true);
          }
        }
      } catch (err) {
        toast.error(err.message);
      }
    };
    getTime();
  }, []);

  const resendHandler = async () => {
    try {
      const resp = await fetch(summeryApi.forgetPassword.url, {
        method: summeryApi.forgetPassword.method,
        body: JSON.stringify({ email: localStorage.getItem("email") }),
        headers: {
          "content-type": "application/json",
        },
      });

      const result = await resp.json();

      if (result.success) {
        toast.success(result.message);
        localStorage.setItem("passToken", result?.token);
        setOtpTime(1 * 60 * 1000);
        setIsExpire(false);
      }
      if (result.error) {
        toast.error(result.message);
      }
    } catch (err) {}
  };
  return (
    <section id="login">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 py-2 w-full max-w-sm mx-auto">
          <div className="flex flex-col items-center justify-center gap-3">
            <div>
              <IoFingerPrint className="text-5xl text-blue-400" />
            </div>
            <form onSubmit={handlesubmit}>
              <div className="flex gap-2  text-center flex-col">
                <p className="text-xl font-bold mt-5 text-blue-400 ">Verify your OTP</p>
                <p className="text-sm text-slate-500">
                  Enter 6-digit OTP here we just sent at your email
                </p>
              </div>
              <div className="mt-4">
                <label>OTP*</label>
                <div className=" mt-2  flex items-center flex-row gap-2">
                  {inputRef.map((item, index) => {
                    return (
                      <input
                        required
                        key={index}
                        ref={item}
                        onChange={(event) => inputChange(event, index)}
                        type="number"
                        onInput={(e) => {
                          if (e.target.value.length > 1) {
                            e.target.value = e.target.value.slice(0, 1);
                          }
                        }}
                        className="border-slate-500 border w-10 h-10 rounded text-center"
                      />
                    );
                  })}
                </div>
                <div className="mt-1 text-blue-500">
                  {otpTime !== null && !isexpire ? (
                    <Timer setIsExpire={setIsExpire} time={otpTime} />
                  ) : (
                    <span
                      onClick={resendHandler}
                      className="font-semibold text-red cursor-pointer"
                    >
                      Resend
                    </span>
                  )}
                </div>

                <div className="flex justify-center items-center">
                  <button className="bg-blue-400 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6">
                    Verify
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerifyOpt;
