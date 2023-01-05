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
      <div className=" sticky top-0 flex items-center	justify-between px-8 py-4 h-16 border-b border-l-neutral-800 bg-white  p-8 z-50">
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
        <button id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" class="flex items-center justify-between w-full py-2 pl-3 pr-4 font-medium text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-gray-400 dark:hover:text-white dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">Dropdown <svg class="w-5 h-5 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></button>
            <div id="dropdownNavbar" class="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                <ul class="py-1 text-sm text-gray-700 dark:text-gray-400" >
                  <li>
                    <p href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</p>
                  </li>
                  <li>
                    <p href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</p>
                  </li>
                  <li>
                    <p href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</p>
                  </li>
                </ul>
                <div class="py-1">
                  <p href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">Sign out</p>
                </div>
            </div>
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
