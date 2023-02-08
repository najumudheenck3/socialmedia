import React from "react";
import { Link } from "react-router-dom";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

const Navbar = () => {
  return (
    <>
    {/* navbar */}
      <div className="sticky top-0 flex  items-center bg-specclr z-50	justify-between px-8 py-4 h-16 border-b border-l-neutral-800 text-white p-8">
        {/* left part */}
        <div className="flex items-center	gap-x-4">
          <Link to="/admin">
            <span className="font-bold text-2xl	text-white">QUICKSHARE</span>
          </Link>
          <p>Admin panel</p>
        
        </div>
        {/* right part */}
        <div className="flex items-center gap-x-4">
        
          <NotificationsNoneOutlinedIcon />
          <div className="flex items-center gap-x-2">
            <AccountCircleOutlinedIcon />
            <span>admin</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
