import React from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SmartDisplayOutlinedIcon from "@mui/icons-material/SmartDisplayOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import { Link } from "react-router-dom";

const LeftBar = () => {
  return (
    <div className="flex w-3/12 ">
      <div className="p-7">
        <div className="flex flex-col space-y-2 ">
          <div className="flex items-center gap-x-3  hover:bg-slate-300 h-12 p-2 rounded">
            <AccountCircleOutlinedIcon />
            <span>username</span>
          </div>
          <div className="flex items-center gap-x-3  hover:bg-slate-300 h-12 p-2 rounded">
            <SmartDisplayOutlinedIcon />
            <span>Shorts</span>
          </div>
          <div className="flex items-center gap-x-3  hover:bg-slate-300 h-12 p-2 rounded">
            <PeopleAltOutlinedIcon />
            <span>Friends</span>
          </div>
          <div className="flex items-center gap-x-3  hover:bg-slate-300 h-12 p-2 rounded">
            <MessageOutlinedIcon />
            <span>Messages</span>
          </div>
          <div className="flex items-center gap-x-3  hover:bg-slate-300 h-12 p-2 rounded">
            <NotificationsNoneOutlinedIcon />
            <span>Notifications</span>
          </div>
          <div className="flex items-center gap-x-3  hover:bg-slate-300 h-12 p-2 rounded" onClick={()=>{
                localStorage.clear()
            }}>
            <Link className="flex items-center gap-x-3" to="login">
              <ExitToAppOutlinedIcon />
              <span>Logout</span>
            </Link>
          </div>
        </div>
        <hr className="my-2 bg-slate-300 h-0.5"/>
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
          <div className="flex items-center gap-x-3  hover:bg-slate-300 h-12 p-2 rounded">
            <NotificationsNoneOutlinedIcon />
            <span>Notifications</span>
          </div><div className="flex items-center gap-x-3  hover:bg-slate-300 h-12 p-2 rounded">
            <MessageOutlinedIcon />
            <span>Messages</span>
          </div>
          <div className="flex items-center gap-x-3  hover:bg-slate-300 h-12 p-2 rounded">
            <NotificationsNoneOutlinedIcon />
            <span>Notifications</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
