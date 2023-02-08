import React, { useState } from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SlideshowOutlinedIcon from "@mui/icons-material/SlideshowOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const MobileFooter = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [profImg] = useState(user?.userDetails.profileImage);
  const toProfile = (userId) => {
    navigate("/profile", { state: { id: userId } });
  };
  return (
    <div className="flex sticky bottom-0 items-center border-t  px-8 py-4 h-12 mt-5 border-l-neutral-800 bg-white justify-between md:hidden">
      <Link className="flex items-center gap-x-3" to="/">
        <HomeOutlinedIcon />
      </Link>
      <SearchOutlinedIcon className="cursor-pointer" onClick={()=>navigate('/search')}/>
      <Link className="flex items-center gap-x-3" to="/shorts">
        <SlideshowOutlinedIcon />
      </Link>
      <NotificationsNoneOutlinedIcon className="cursor-pointer" onClick={()=>navigate('/notifications')}/>
      <div className="cursor-pointer"
      onClick={() => {
        toProfile(user?.userDetails._id);
      }}>
        <img
          className="h-8 w-8 object-cover rounded-full"
          src={
            profImg
              ? profImg
              : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          }
          alt=""
        />
      </div>
    </div>
  );
};

export default MobileFooter;
