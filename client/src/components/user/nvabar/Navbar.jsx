import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import ShortsModal from "../shortsModal/ShortsModal";

const Navbar = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [profImg] = useState(user?.userDetails.profileImage);
  const [dorpDown, setDropDown] = useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [videoModal, setVideoModal] = useState(false);
  const handleClose = () => {
    setShowModal(false);
  };
  console.log(user, "ithann user details");
  const toProfile = (userId) => {
    navigate("/profile", { state: { id: userId } });
  };
  return (
    <>
      {/* navbar */}
      <div className=" sticky top-0 flex items-center	justify-between px-8 py-4 h-16 border-b border-l-neutral-800 bg-white  p-8 z-50 ">
        {/* left part */}
        <div className="flex  items-center max-md:w-full	gap-x-4">
          <Link to="/">
            <span className="font-bold text-2xl	text-cyan-900">QUICKSHARE</span>
          </Link>
          <div
            className="flex items-cente gap-x-4 border cursor-pointer border-neutral-300 p-2 rounded-lg max-md:hidden"
            onClick={() => navigate("/search")}
          >
            <SearchOutlinedIcon />
          </div>
          <div className="flex justify-end gap-x-4 md:hidden ml-auto">
            <AddBoxOutlinedIcon
              className="cursor-pointer"
              onClick={() => setDropDown(!dorpDown)}
            />
            <MessageOutlinedIcon
              className="cursor-pointer"
              onClick={() => navigate("/messenger")}
            />
          </div>
        </div>
        {/* right part */}
        {dorpDown && (
          <div className="absolute right-28 top-16 p-5 max-md:right-6 max-md:top-16 bg-white rounded-2xl h-40 w-44 shadow-xl">
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
              {/* <div className="flex gap-6 cursor-pointer">
                <RestoreOutlinedIcon />
                <h1>Story</h1>
              </div> */}
              <div
                className="flex gap-6 cursor-pointer"
                onClick={() => {
                  setVideoModal(!videoModal);
                  setDropDown(!dorpDown);
                }}
              >
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
          <Link className="flex items-center gap-x-3" to="notifications">
            <NotificationsNoneOutlinedIcon />
          </Link>
          <div
            className="flex items-center gap-x-2 cursor-pointer"
            onClick={() => {
              toProfile(user?.userDetails._id);
            }}
          >
            {/* <AccountCircleOutlinedIcon /> */}
            <img
              className="h-10 w-10 object-cover rounded-full"
              src={
                profImg
                  ? profImg
                  : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              }
              alt=""
            />
          </div>
        </div>
        <PostModal visible={showModal} onClose={handleClose} />
        {videoModal && <ShortsModal setVideoModal={setVideoModal} />}
      </div>
    </>
  );
};

export default Navbar;
