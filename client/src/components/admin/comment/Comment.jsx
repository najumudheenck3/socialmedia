import React, { useState } from "react";
import Moment from "react-moment";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import CommentsReply from "../commentsReply/CommentsReply";
import { useEffect } from "react";
import {

  likePostComment,
  postCommentReply,
} from "../../../api/user/CommentRequest";
import { useNavigate } from "react-router-dom";
import { getAllCommentReplies } from "../../../api/admin/PostRequest";

const Comment = ({ comment }) => {
  const navigate = useNavigate();

  const [profImg] = useState(comment?.profileImage);
  const [replyCommentOpen, setReplyCommnetOpen] = useState(false);
  const [commentLikeCount, setcommentLikeCount] = useState(
    comment?.likes.length
  );
  const [allCommentReplies, setAllCommentReplies] = useState([]);
  const [commentReplyCount, setCommentReplyCount] = useState(0);
  const commentId = comment?._id;
  const [newCommentReply, setNewCommentReply] = useState("");
  console.log(commentId, "comment idddd");
  useEffect(() => {
    const getCommentReply = async () => {
      const response = await getAllCommentReplies(comment?._id);
      setAllCommentReplies(response);
      setCommentReplyCount(response.length);
    };
    getCommentReply();
  }, [comment]);

  //go to profile page
  const toProfile = (userId) => {
    navigate("/admin/user-profile", { state: { id: userId } });
  };

  return (
    <>
      <div className="my-4 flex justify-between gap-5">
        <img
          className="h-10 w-10 rounded-full object-cover cursor-pointer"
          src={
            profImg
              ? profImg
              : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          }
          alt=""
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
            {comment?.firstName} {comment?.lastName}
          </span>
          <p>{comment?.comment}</p>
          <div className="flex gap-x-4 items-center">
            {commentLikeCount}
        
              <FavoriteBorderOutlinedIcon
                fontSize="small"
                className="text-red-700 cursor-pointer"
              />
          
            <h1
              className="text-gray-700 cursor-pointer"
              onClick={() => setReplyCommnetOpen(!replyCommentOpen)}
            >
              {commentReplyCount} Reply
            </h1>
          </div>
        </div>
        <Moment className="self-center text-gray-500 text-xs" fromNow>
          {comment?.createdAt}
        </Moment>
      </div>
      {replyCommentOpen && (
        <div className=" w-10/12 ml-14">
          <div className=" scrollbar-thin scrollbar-thumb-gray-300 scrollbar-thumb-rounded-full  overflow-y-scroll ">
            {allCommentReplies?.map((commentReply) => (
              <CommentsReply comment={commentReply} key={commentReply._id} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Comment;
