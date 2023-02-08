import React, { useEffect, useState } from "react";
import { getChatUser } from "../../../api/user/ChatRequest";

const Conversations = ({ conversation, currentUser }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const friendId = conversation?.members?.find(
      (m) => m !== currentUser?.userDetails?._id
    );
    const getUser = async () => {
      const response = await getChatUser(friendId);
      if (response) {
        setUser(response);
      }
    };
    getUser();
  }, [conversation, currentUser]);

  return (
    <div className="flex items-center p-2 gap-x-4 cursor-pointer hover:bg-slate-200 mt-4">
      <img
        className="h-10 w-10 rounded-full object-cover "
        src={user?.profileImage?user?.profileImage:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
        alt=""
      />
      <span className="font-medium max-md:hidden">{user?.firstName} {user?.lastName}</span>
    </div>
  );
};

export default Conversations;
