import { useState } from "react";
import Moment from "react-moment";
import { useNavigate } from "react-router-dom";

const CommentsReply = ({ comment }) => {
  const navigate = useNavigate();
  const [profImg] = useState(comment?.profileImage);
  //go to profile page
  const toProfile = (userId) => {
    navigate("/admin/user-profile", { state: { id: userId } });
  };
  return (
    <div className="my-4 flex justify-between gap-5">
      <img
        className="h-8 w-8 rounded-full object-cover cursor-pointer"
        src={
          profImg
            ? profImg
            : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        }
        alt="logo"
        onClick={() => {
          toProfile(comment?.userId);
        }}
      />
      <div className="flex flex-col gap-1 items-start flex-1">
        <span
          className="text-sm font-bold cursor-pointer"
          onClick={() => {
            toProfile(comment?.userId);
          }}
        >
          {comment.firstName} {comment.lastName}
        </span>
        <p className="text-sm ">{comment.comment}</p>
      </div>
      <Moment className="self-center text-gray-500 text-xs" fromNow>
        {comment.createdAt}
      </Moment>
    </div>
  );
};

export default CommentsReply;
