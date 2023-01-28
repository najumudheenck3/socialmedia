import React from "react";
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import FeaturedVideoOutlinedIcon from '@mui/icons-material/FeaturedVideoOutlined';
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { Link } from "react-router-dom";


const LeftBar = () => {
  return (
    <div className="bg-specclr m-2 rounded text-white  h-screen w-2/12 max-sm:absolute max-md:absolute max-lg:absolute">
      <div className="p-7">
        <div className="flex flex-col space-y-6 ">
          <div className="flex items-center gap-x-3  hover:bg-cyan-900 h-12 p-2 rounded">
            <GridViewOutlinedIcon/>
            <span>Dashboard</span>
          </div>
          <div className="flex items-center gap-x-3  hover:bg-cyan-900 h-12 p-2 rounded">
            <Link className="flex items-center gap-x-3" to='user-list'>
          <AccountCircleOutlinedIcon />
            <span>users</span>
            </Link>
          </div>
       
          <div className="flex items-center gap-x-3  hover:bg-cyan-900 h-12 p-2 rounded">
            <FeaturedVideoOutlinedIcon/>
            <span>Advertisement</span>
          </div>
          <div className="flex items-center gap-x-3  hover:bg-cyan-900 h-12 p-2 rounded">
            <NotificationsNoneOutlinedIcon/>
            <span>Notifications</span>
          </div>
          <div className="flex items-center gap-x-3  hover:bg-cyan-900 h-12 p-2 rounded" onClick={()=>{
                localStorage.clear()
            }}>

            <Link className="flex items-center gap-x-3" to='login'><ExitToAppOutlinedIcon/>
            <span>Logout</span></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
