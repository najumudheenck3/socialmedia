import React, { useState } from "react";
import Moment from "react-moment";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentsReply from "../commentsReply/CommentsReply";

const Comment = ({ comment }) => {
  const [replyCommentOpen, setReplyCommnetOpen] = useState(false);
  const [likeComment, setLikeSomment] = useState(false);
  
  return (
    <>
      <div className="my-4 flex justify-between gap-5">
        <img
          className="h-10 w-10 rounded-full object-cover"
          src="https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt=""
        />
        <div className="flex flex-col gap-1 items-start flex-1">
          <span className="text-sm font-bold">{comment?.firstName}</span>
          <p>{comment?.comment}</p>
          <div className="flex gap-x-4 items-center">
            {likeComment ? (
              <FavoriteIcon
                fontSize="small"
                className="text-red-700 cursor-pointer"
                onClick={() => setLikeSomment(!likeComment)}
              />
            ) : (
              <FavoriteBorderOutlinedIcon
                fontSize="small"
                className="text-red-700 cursor-pointer"
                onClick={() => setLikeSomment(!likeComment)}
              />
            )}
            <h1
              className="text-gray-700 cursor-pointer"
              onClick={() => setReplyCommnetOpen(!replyCommentOpen)}
            >
              Reply
            </h1>
          </div>
        </div>
        <Moment className="self-center text-gray-500 text-xs" fromNow>
          {comment?.createdAt}
        </Moment>
      </div>
      {replyCommentOpen && <CommentsReply commentId={comment?._id}/>}
    </>
  );
};

export default Comment;
