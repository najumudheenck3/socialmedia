import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getAllNotifications } from '../../api/user/userRequest';
import Notification from '../../components/user/notification/Notification'

const Notifications = () => {
  const userId = useSelector((state) => state.user.userDetails._id);
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    const fetchNotification = async () => {
      const notification = await getAllNotifications();
      setNotifications(notification);
    };
    fetchNotification();
  }, []);
  return (
    <div className="bg-white w-full h-screen m-5 rounded-md p-5">
      <h1 className="font-bold text-lg">Notifications</h1>
      
      {notifications && notifications?.map((notification)=>(
        <Notification notification={notification}/>
        ))}
      
    

    </div>
  )
}

export default Notifications