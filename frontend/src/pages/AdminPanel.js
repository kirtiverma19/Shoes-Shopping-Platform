import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaRegUser } from "react-icons/fa";
import { Link, useNavigate, Outlet } from "react-router-dom";
import ROLE from "../common/role";
function AdminPanel() {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role !== ROLE.ADMIN) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="min-h-[calc(100vh-120px)] flex  md:flex  ">
      <aside className="bg-white  min-h-full w-full max-w-60 customShadow">
        <div className="h-32  flex justify-center items-center flex-col">
          <div className="text-4xl cursor-pointer relative flex justify-center">
            {user?.profilePic ? (
              <img
                src={user?.profilePic}
                className=" bg-cover  h-20 w-20 rounded-full"
                alt={user?.username}
              />
            ) : (
              <FaRegUser />
            )}
          </div>
          <p className="captilize text-lg font-semibold"> {user?.username}</p>
          <p className="text-sm">{user?.role}</p>
        </div>
        {/**navigation */}
        <div>
          <nav className="grid p-4">
            <Link to={"all-users"} className="px-2 py-1 hover:bg-slate-100">
              All users
            </Link>
            <Link to={"product"} className="px-2 py-1 hover:bg-slate-100">
              All product
            </Link>
            <Link to={"all-orders"} className="px-2 py-1 hover:bg-slate-100">
              All orders
            </Link>
          </nav>
        </div>
      </aside>
      <main className="h-full w-full p-4">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminPanel;
