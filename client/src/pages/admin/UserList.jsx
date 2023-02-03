import React, { useState, useEffect } from "react";
import Moment from "react-moment";
import { useNavigate } from "react-router-dom";
import { changeUserStatus, getAllUsers } from "../../api/admin/UserRequest";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getAllUsers().then((users) => {
      setUsers(users);
    });
  }, []);
  const changeStatus = (userId) => {
    changeUserStatus(userId).then((users) => {
      setUsers(users);
    });
  };
  const toProfile = (userId) => {
    navigate("/admin/user-profile", { state: { id: userId } });
  };
  return (
    <div className="relative m-2 p-2 overflow-x-auto bg-white shadow-md sm:rounded-lg w-10/12">
      <div className="flex items-center justify-between py-4  dark:bg-gray-800">
        <label for="table-search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            id="table-search-users"
            className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for users"
          />
        </div>
      </div>
      <table className="w-full text-sm  text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Position
            </th>
            <th scope="col" className="px-6 py-3">
              Data of Birth
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <th
                scope="row"
                className="flex items-center cursor-pointer px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                onClick={() => {
                  toProfile(user?._id);
                }}
              >
                <img
                  className="w-10 h-10 rounded-full object-cover"
                  src="https://st4.depositphotos.com/5989284/20550/i/450/depositphotos_205505676-stock-photo-portrait-uncertain-young-stylish-stubble.jpg"
                  alt=""
                />
                <div className="pl-3">
                  <div className="text-base font-semibold">
                    {user?.firstName} {user?.lastName}
                  </div>
                  <div className="font-normal text-gray-500">{user.email}</div>
                </div>
              </th>
              <td className="px-6 py-4"> <Moment format="YYYY-MM-DD HH:mm">{user?.createdAt}</Moment></td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  {user?.dob?<Moment format="YYYY-MM-DD HH:mm">{user?.dob}</Moment>:"--"}
                </div>
              </td>
              <td className="px-6 py-4">
                {user.isActive && (
                  <button
                    type="button"
                    data-modal-target="editUserModal"
                    data-modal-show="editUserModal"
                    className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer"
                    onClick={() => changeStatus(user._id)}
                  >
                    Block
                  </button>
                )}
                {!user.isActive && (
                  <button
                    type="button"
                    data-modal-target="editUserModal"
                    data-modal-show="editUserModal"
                    className="font-medium text-green-600 dark:text-green-500 hover:underline cursor-pointer"
                    onClick={() => changeStatus(user._id)}
                  >
                    UnBlock
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
