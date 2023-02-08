import React, { useEffect, useState } from "react";
import { getAllNotifications } from "../../api/admin/PostRequest";
import Notification from "../../components/admin/notification/Notification";
import { Link, useNavigate } from "react-router-dom";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
      const fetchNotification = async () => {
          const allNotifications = await getAllNotifications();
          if(allNotifications){
              setNotifications(allNotifications);
          }
    };
    fetchNotification();
  }, []);
  return (
    <div className="bg-white w-full m-5 rounded-md p-5">
      <h1 className="font-bold text-lg">Notifications</h1>
      {notifications&&notifications?.map((notification)=>(
      <Notification notification={notification}/>
      ))}
    </div>
  );
};

export default Notifications;
