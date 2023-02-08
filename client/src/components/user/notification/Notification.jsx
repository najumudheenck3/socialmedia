import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Notification = ({notification}) => {
  const [profImg] = useState(notification?.userId?.profileImage);
  const navigate = useNavigate();
  const toProfile = (userId) => {
    navigate("/profile", { state: { id: userId } });
  };
  return (
    <>
   <div className="flex gap-x-4 m-4 cursor-pointer " onClick={()=>toProfile(notification?.userId?._id)}>
        <img
          className="h-10 w-10 rounded-full  object-cover"
          src={
            profImg
              ? profImg
              : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          }          alt=""
        />
        <h1 className="font-semibold">{notification?.userId?.firstName} {notification?.userId?.lastName}</h1>
        <h1>{notification?.text} </h1>
      </div>
      
    </>
  );
};

export default Notification;
