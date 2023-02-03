import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { getOnePost } from "../../../api/admin/PostRequest";
import Post from "../onePost/OnePost";

const ReportedUsers = () => {
  const location = useLocation();
  const users = location.state;
  const [onePostView,setOnePostView]=useState(false)
 
 
  return (
    <div className="relative m-2 p-2 overflow-x-auto bg-white shadow-md sm:rounded-lg w-10/12">
      <div className="flex items-center justify-between py-2  dark:bg-gray-800"></div>
      <table className="w-full text-sm  text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              User
            </th>
            <th scope="col" className="px-6 py-3">
              Reason
            </th>
           
            
          </tr>
        </thead>
        <tbody>
          {users?.userText?.map((user) => (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <th
                scope="row"
                className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
              >
                <img
                  className="w-10 h-10 rounded-full object-cover"
                  src="https://st4.depositphotos.com/5989284/20550/i/450/depositphotos_205505676-stock-photo-portrait-uncertain-young-stylish-stubble.jpg"
                  alt=""
                />
                <div className="pl-3">
                  <div className="text-base font-semibold">
                    {user.userId.firstName} {user.userId.lastName}
                  </div>
                  <div className="font-normal text-gray-500">
                    {user.userId.email}
                  </div>
                </div>
              </th>
              <td className="px-6 py-4 ">{user.text}</td>
           
              
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-center pt-3 ">
        <button className="bg-specclr p-1 text-white rounded-md" onClick={()=>setOnePostView(!onePostView)}>View Post</button>
      </div>
      {onePostView && <Post post={users?.postId}/>}
    </div>
  );
};

export default ReportedUsers;
