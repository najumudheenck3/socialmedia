import React from "react";
import { Link } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { useSelector } from "react-redux";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  console.log(user,'ithann user details');
  return (
    <>
      {/* navbar */}
      <div className=" sticky top-0 flex items-center	justify-between px-8 py-4 h-16 border-b border-l-neutral-800 bg-white   p-8">
        {/* left part */}
        <div className="flex items-center	gap-x-4">
          <Link to="/">
            <span className="font-bold text-2xl	text-cyan-900">QUICKSHARE</span>
          </Link>
          <HomeOutlinedIcon />
          <GridViewOutlinedIcon />
          <div className="flex items-cente gap-x-4 border border-neutral-300 p-2 rounded-lg">
            <SearchOutlinedIcon />
            <input
              className="border-none w-96"
              type="text"
              placeholder="search..."
            />
          </div>
        </div>
        {/* right part */}
        <div className="flex items-center gap-x-4">
          <AddBoxOutlinedIcon />
          <NotificationsNoneOutlinedIcon />
          <div className="flex items-center gap-x-2">
            <AccountCircleOutlinedIcon />
            <span>{user.userName}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
