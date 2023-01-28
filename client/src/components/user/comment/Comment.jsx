import React, { useState } from "react";
import Moment from "react-moment";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentsReply from "../commentsReply/CommentsReply";
import { useEffect } from "react";
import {
  getAllCommentReplies,
  likePostComment,
  postCommentReply,
} from "../../../api/user/CommentRequest";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import InputEmoji from "react-input-emoji";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Comment = ({ comment }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userDetails);
  const [profImg] = useState(comment?.profileImage);
  const [replyCommentOpen, setReplyCommnetOpen] = useState(false);
  const [likeComment, setLikeComment] = useState(
    comment?.likes.includes(user._id)
  );
  const [commentLikeCount, setcommentLikeCount] = useState(
    comment?.likes.length
  );
  const [allCommentReplies, setAllCommentReplies] = useState([]);
  const [commentReplyCount, setCommentReplyCount] = useState(0);
  const commentId = comment?._id;
  const [newCommentReply, setNewCommentReply] = useState("");
  console.log(commentId, "comment idddd");
  const handlePostCommentReply = async () => {
    if (newCommentReply.trim().length < 0) return;
    console.log(newCommentReply.trim(), "reply commentsss");
    try {
      const response = await postCommentReply(
        commentId,
        newCommentReply.trim()
      );
      console.log(response, "the cinnebt");
      setAllCommentReplies([response, ...allCommentReplies]);
      setCommentReplyCount(commentReplyCount + 1);
    } catch (error) {
      console.log(error);
    }
    setNewCommentReply("");
  };

  //comment liking
  const handleLikeComment = async (id) => {
    try {
      await likePostComment(id);
      setLikeComment(!likeComment);
      setcommentLikeCount((prevCount) => {
        if (likeComment) {
          return prevCount - 1;
        } else {
          return prevCount + 1;
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

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
    navigate("/profile", { state: { id: userId } });
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
            {likeComment ? (
              <FavoriteIcon
                fontSize="small"
                className="text-red-700 cursor-pointer"
                onClick={() => handleLikeComment(comment?._id)}
              />
            ) : (
              <FavoriteBorderOutlinedIcon
                fontSize="small"
                className="text-red-700 cursor-pointer"
                onClick={() => handleLikeComment(comment?._id)}
              />
            )}
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
          <div className="flex items-center justify-between gap-5 my-5">
            <img
              className="h-8 w-8 rounded-full object-cover"
              src="data:image/jpeg;base64,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"
              alt=""
            />

            <InputEmoji
              className="w-full p-2 "
              value={newCommentReply}
              cleanOnEnter
              onChange={(e) => setNewCommentReply(e)}
              onEnter={handlePostCommentReply}
              placeholder="Type a message"
            />
            <SendOutlinedIcon
              className="text-specclr cursor-pointer"
              onClick={handlePostCommentReply}
            />
          </div>
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
