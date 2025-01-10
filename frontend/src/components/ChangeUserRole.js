import React, { useState } from "react";
import ROLE from "../common/role";
import { IoCloseSharp } from "react-icons/io5";
import summeryApi from "../common";
import { toast } from "react-toastify";

function ChangeUserRole({ username, email, userid, role, onClose, callFunc }) {
  const [userRole, setuserRole] = useState(role);

  const handleOnChangeSelect = (e) => {
    setuserRole(e.target.value);
  };

  const updateUserRole = async () => {
    const fetchResponse = await fetch(summeryApi.UpdateUser.url, {
      method: summeryApi.UpdateUser.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userid: userid,
        role: userRole,
      }),
    });

    const responseData = await fetchResponse.json();

    if (responseData.success) {
      toast.success(responseData.message);
      onClose();
      callFunc();
    }
  };
  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 w-full h-full z-10 flex justify-center items-center bg-slate-200 bg-opacity-50">
      <div className="mx-auto bg-white shadow-md p-4 w-full max-w-sm">
        <button className="block ml-auto" onClick={onClose}>
          <IoCloseSharp />
        </button>

        <h1 className="pb-4 text-lg font-medium">Change User Role</h1>
        <p>Name:{username}</p>
        <p>Email:{email}</p>
        <div className="flex items-center justify-between my-4">
          <p>Role</p>
          <select
            className="border px-4 py-1"
            value={userRole}
            onChange={handleOnChangeSelect}
          >
            {Object.values(ROLE).map((el) => {
              return (
                <option value={el} key={el}>
                  {el}
                </option>
              );
            })}
          </select>
        </div>
        <button
          className="w-fit mx-auto block py-1  px-3 rounded-full bg-blue-400 hover:bg-blue-500 text-white"
          onClick={updateUserRole}
        >
          Change Role
        </button>
      </div>
    </div>
  );
}

export default ChangeUserRole;
