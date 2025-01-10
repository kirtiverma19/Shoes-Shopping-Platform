import React, { useEffect, useState } from "react";
import summeryApi from "../common";
import { toast } from "react-toastify";
import moment from "moment";
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from "../components/ChangeUserRole";

function Users() {
  const [alluser, setalluser] = useState([]);
  const [openUpdateRole, setopenUpdateRole] = useState(false);
  const [updateUserDetails, setupdateUserDetails] = useState({
    username: "",
    email: "",
    role: "",
    _id: "",
  });
  const fetchallusers = async () => {
    const fetchdata = await fetch(summeryApi.allUser.url, {
      method: summeryApi.allUser.method,
      credentials: "include",
    });
    const dataresponse = await fetchdata.json();
    console.log(dataresponse);
    if (dataresponse.success) {
      setalluser(dataresponse.data);
    }

    if (dataresponse.error) {
      toast.error(dataresponse.message);
    }
  };
  useEffect(() => {
    fetchallusers();
  }, []);

  return (
    <div className="bg-white pb-4">
      <table className="w-full userTable">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th>Sr.</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role </th>
            <th>Created date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {alluser.map((el, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{el?.username}</td>
                <td>{el?.email}</td>
                <td>{el?.role}</td>
                <td>{moment(el?.createdAt).format("LL")}</td>
                <td>
                  <button
                    className="bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white"
                    onClick={() => {
                      setupdateUserDetails(el);
                      setopenUpdateRole(true);
                    }}
                  >
                    <MdModeEdit />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {openUpdateRole && (
        <ChangeUserRole
          onClose={() => setopenUpdateRole(false)}
          username={updateUserDetails.username}
          email={updateUserDetails.email}
          role={updateUserDetails.role}
          userid={updateUserDetails._id}
          callFunc={fetchallusers}
        />
      )}
    </div>
  );
}

export default Users;
