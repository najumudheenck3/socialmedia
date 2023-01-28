import React, { useState } from "react";
import SmartDisplayOutlinedIcon from "@mui/icons-material/SmartDisplayOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const LeftBar = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [profImg] = useState(user?.userDetails.profileImage);
  const toProfile = (userId) => {
    navigate("/profile", { state: { id: userId } });
  };
  return (
    <div className="hidden md:block h-full sticky top-16  w-3/12 bg-white shadow-md  max-md:w-0">
      <div className="p-7 ">
        <div className="flex flex-col space-y-2">
          <div
            className="flex items-center gap-x-3 cursor-pointer  hover:bg-slate-300 h-12 p-2 rounded"
            onClick={() => {
              toProfile(user?.userDetails._id);
            }}
          >
            <img
              className="h-10 w-10 object-cover rounded-full"
              src={profImg?profImg:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
              alt=""
            />
            <span>{user?.userDetails.firstName}</span>
          </div>
          <div className="flex items-center gap-x-3  hover:bg-slate-300 h-12 p-2 rounded">
            <SmartDisplayOutlinedIcon />
            <span>Shorts</span>
          </div>
          <div className="flex items-center gap-x-3  hover:bg-slate-300 h-12 p-2 rounded">
            <Link className="flex items-center gap-x-3" to="/friend-requests">
              <PeopleAltOutlinedIcon />
              <span>Friends</span>
            </Link>
          </div>
          <div className="flex items-center gap-x-3  hover:bg-slate-300 h-12 p-2 rounded">
            <Link className="flex items-center gap-x-3" to="/messenger">
              <MessageOutlinedIcon />
              <span>Messages</span>
            </Link>
          </div>
          <div className="flex items-center gap-x-3  hover:bg-slate-300 h-12 p-2 rounded">
            <Link className="flex items-center gap-x-3" to="notifications">
              <NotificationsNoneOutlinedIcon />
              <span>Notifications</span>
            </Link>
          </div>
          <div
            className="flex items-center gap-x-3  hover:bg-slate-300 h-12 p-2 rounded"
            onClick={() => {
              localStorage.clear();
            }}
          >
            <Link className="flex items-center gap-x-3" to="login">
              <ExitToAppOutlinedIcon />
              <span>Logout</span>
            </Link>
          </div>
        </div>
        <hr className="my-2 bg-slate-300 h-0.5" />
        <div className="flex flex-col space-y-2 ">
          <span className="pl-2 text-sm">Your shortcuts</span>
          <div className="flex items-center gap-x-3  hover:bg-slate-300 h-12 p-2 rounded">
            <MessageOutlinedIcon />
            <span>Messages</span>
          </div>
          <div className="flex items-center gap-x-3  hover:bg-slate-300 h-12 p-2 rounded">
            <NotificationsNoneOutlinedIcon />
            <span>Notifications</span>
          </div>
          <div className="flex items-center gap-x-3  hover:bg-slate-300 h-12 p-2 rounded">
            <MessageOutlinedIcon />
            <span>Messages</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
