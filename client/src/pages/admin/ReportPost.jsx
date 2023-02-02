import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { changePostStatus, getAllReportedPosts } from "../../api/admin/PostRequest";

const ReportPost = () => {
  const [reportedPosts, setReportedPosts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getAllReportedPosts().then((reportedPost) => {
      console.log(reportedPost,'grrrrrrrrrr');
      setReportedPosts(reportedPost);
    });
  }, []);
  const toReportDetail = (reportData) => {
    navigate("/admin/report-detail", { state:reportData});
  };
  const changeStatus = (postId) => {
    changePostStatus(postId)
  };
  return (
    <div className="relative m-2 p-2 overflow-x-auto bg-white shadow-md sm:rounded-lg w-10/12">
      <div className="flex items-center justify-between py-2  dark:bg-gray-800"></div>
      <table className="w-full text-sm  text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Post
            </th>
            <th scope="col" className="px-6 py-3">
              Reported Count
            </th>
            <th scope="col" className="px-6 py-3">
              Reported Users
            </th>
            <th scope="col" className="px-6 py-3">
              Post Status
            </th>
          </tr>
        </thead>
        <tbody>
          {reportedPosts?.map((reportedPost) => (
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
              </th>
              <td className="px-6 py-4 ">{reportedPost?.userText.length}</td>
              <td className="px-6 py-4">
                <div className="flex items-center ">
               
                    <button className="hover:underline"  onClick={() => {
              toReportDetail(reportedPost?.userText);
            }}>View</button>
                </div>
              </td>
              <td className="px-6 py-4">
                {reportedPost?.postId?.isActive && (
                  <button
                    type="button"
                    data-modal-target="editUserModal"
                    data-modal-show="editUserModal"
                    className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer"
                    onClick={() => changeStatus(reportedPost?.postId?._id)}
                  >
                    Hide
                  </button>
                )}
                {!reportedPost?.postId?.isActive && (
                <button
                  type="button"
                  data-modal-target="editUserModal"
                  data-modal-show="editUserModal"
                  className="font-medium text-green-600 dark:text-green-500 hover:underline cursor-pointer"
                  onClick={() => changeStatus(reportedPost?.postId?._id)}
                >
                  UnHide
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

export default ReportPost;
