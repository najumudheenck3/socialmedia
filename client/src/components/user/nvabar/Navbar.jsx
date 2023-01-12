import React, { useState } from "react";
import { Link } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import RestoreOutlinedIcon from "@mui/icons-material/RestoreOutlined";
import SlideshowOutlinedIcon from "@mui/icons-material/SlideshowOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";

import { useSelector } from "react-redux";
import PostModal from "../postModal/PostModal";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const [dorpDown, setDropDown] = useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const handleClose = () => {
    setShowModal(false);
  };
  console.log(user, "ithann user details");
  return (
    <>
      {/* navbar */}
      <div className=" sticky top-0 flex items-center	justify-between px-8 py-4 h-16 border-b border-l-neutral-800 bg-white  p-8 z-50 ">
        {/* left part */}
        <div className="flex  items-center max-md:w-full	gap-x-4">
          <Link to="/">
            <span className="font-bold text-2xl	text-cyan-900">QUICKSHARE</span>
          </Link>
          <div className="max-md:hidden">
            <HomeOutlinedIcon />
          </div>
          <div className="max-md:hidden">
            <GridViewOutlinedIcon />
          </div>
          <div className="flex items-cente gap-x-4 border border-neutral-300 p-2 rounded-lg max-md:hidden">
            <SearchOutlinedIcon />
            <input
              className="border-none "
              type="text"
              placeholder="search..."
            />
          </div>
          <div className="flex justify-end gap-x-4 md:hidden ml-auto">
            <AddBoxOutlinedIcon
              className="cursor-pointer"
              onClick={() => setDropDown(!dorpDown)}
            />
            <MessageOutlinedIcon />
          </div>
        </div>
        {/* right part */}
        {dorpDown && (
          <div className="absolute right-28 top-16 p-5 max-md:right-6 max-md:top-16 bg-white rounded-2xl h-48 w-44 shadow-xl">
            <h1 className="text-xl font-bold">Create</h1>
            <div className="flex flex-col gap-y-4 mt-3">
              <div
                className="flex gap-6 cursor-pointer"
                onClick={() => {
                  setShowModal(!showModal);
                  setDropDown(!dorpDown);
                }}
              >
                <ImageOutlinedIcon />
                <h1>Post</h1>
              </div>
              <div className="flex gap-6 cursor-pointer">
                <RestoreOutlinedIcon />
                <h1>Story</h1>
              </div>
              <div className="flex gap-6 cursor-pointer">
                <SlideshowOutlinedIcon />
                <h1>Shorts</h1>
              </div>
            </div>
          </div>
        )}
        <div className="flex items-center gap-x-4 max-md:hidden">
          <AddBoxOutlinedIcon
            className="cursor-pointer"
            onClick={() => setDropDown(!dorpDown)}
          />

          <NotificationsNoneOutlinedIcon />
          <div className="flex items-center gap-x-2">
            <Link className="flex gap-x-2 items-center" to={`/profile?id=1234`}>
              {/* <AccountCircleOutlinedIcon /> */}
              <img   className="h-10 w-10 object-cover rounded-full" src="https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" />
              <span>{user.userName}</span>
            </Link>
          </div>
        </div>
        <PostModal visible={showModal} onClose={handleClose} />
      </div>
    </>
  );
};

export default Navbar;
