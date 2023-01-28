import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getAllFollowing } from "../../../api/user/FollowRequest";

const ChatOnline = ({ onlineUsers, currentId, setCurrentChat }) => {
  const user = useSelector((state) => state.user);
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      const response = await getAllFollowing(user?.userDetails._id);
      console.log(response,'online users seta avvann');
      if (response) {
        setFriends(response);
      }
    };
    getFriends();
  }, [user?.userDetails._id]);

  useEffect(() => {
    setOnlineFriends(
      friends?.filter((friend) => onlineUsers.includes(friend._id))
    );
  }, [friends, onlineUsers]);

  return (
    <div>
      {onlineFriends?.map((online) => (
        <div className="flex items-center cursor-pointer gap-x-2 mt-3">
          <div className="relative ">
            <img
              className="h-8 w-8 rounded-full object-cover"
              src="https://d1shwc4yijf729.cloudfront.net/resized/1280x640/assets/2021/07/08/pexels-giftpunditscom-1310522_25_60e67d243d570.webp"
              alt=""
            />
            <div className="h-2 w-2 rounded-full absolute bg-green-600 top-0 right-0"></div>
          </div>
          <span>hiba daliya</span>
        </div>
      ))}
    </div>
  );
};

export default ChatOnline;
