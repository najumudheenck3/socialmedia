import React, { useEffect, useState } from "react";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import { useNavigate } from "react-router-dom";
import Comments from "../comments/Comments";
import { likePost } from "../../../api/user/PostRequest";
import { useSelector } from "react-redux";

const Post = ({ post }) => {
  const user = useSelector((state) => state.user.userDetails);
  const [postOptions, setPostOptions] = useState(false);
  const [commentOpen, setCommnetOpen] = useState(false);
  const [time, setTime] = useState("");
  const [liked, setLiked] = useState(post.likes.includes(user._id));
  const [likeCount, setLikeCount] = useState(post.likes.length);
  const [comm, setComm] = useState([]);
  const navigate = useNavigate();
  //setposttime
  useEffect(() => {
    var timeSince = function (date) {
      if (typeof date !== "object") {
        date = new Date(date);
      }

      var seconds = Math.floor((new Date() - date) / 1000);
      var intervalType;

      var interval = Math.floor(seconds / 31536000);
      if (interval >= 1) {
        intervalType = "year";
      } else {
        interval = Math.floor(seconds / 2592000);
        if (interval >= 1) {
          intervalType = "month";
        } else {
          interval = Math.floor(seconds / 86400);
          if (interval >= 1) {
            intervalType = "day";
          } else {
            interval = Math.floor(seconds / 3600);
            if (interval >= 1) {
              intervalType = "hour";
            } else {
              interval = Math.floor(seconds / 60);
              if (interval >= 1) {
                intervalType = "minute";
              } else {
                interval = seconds;
                intervalType = "second";
              }
            }
          }
        }
      }

      if (interval > 1 || interval === 0) {
        intervalType += "s";
      }

      return interval + " " + intervalType;
    };

    setTime(timeSince(post.createdAt));
  }, [time]);

  //post liking
  const handleLikePost = async (id) => {
    try {
      await likePost(id);
      setLiked(!liked);
      setLikeCount((prevCount) => {
        if (liked) {
          return prevCount - 1;
        } else {
          return prevCount + 1;
        }
      });
    } catch (error) {}
  };

  //go to profile page
  const toProfile = (userId) => {
    navigate("/profile", { state: { id: userId } });
  };
  return (
    <div className="post relative bg-white shadow-md rounded-lg">
      <div className="containner p-5">
        {/* user */}
        <div className="flex items-center justify-between">
          <div className="flex gap-5">
            <img
              className="h-10 w-10 object-cover rounded-full"
              src="https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt=""
            />
            <div className="flex flex-col">
              <span
                className="font-bold cursor-pointer"
                onClick={() => {
                  toProfile(post.userId._id);
                }}
              >
                {post.userId.firstName}
              </span>
              <span className="text-xs">{time} ago</span>
            </div>
          </div>
          <MoreHorizOutlinedIcon className="cursor-pointer" onClick={() => setPostOptions(!postOptions)} />
        </div>

        {/* report */}
        {postOptions && (
          <div className="absolute z-50 top-12 border right-12 p-2 font-semibold rounded-lg bg-white w-40">
            <p
              href=""
              className="flex gap-3 py-2 my-2 hover:bg-[#bbc0c7] -mx-2 px-2 rounded-md transition-all hover:scale-90 hover:shadow-md shadow-gray-400 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                />
              </svg>
              Save post
            </p>
            <p
              href=""
              className="flex gap-3 py-2 my-2 cursor-pointer hover:bg-[#bbc0c7] -mx-2 px-2 rounded-md transition-all hover:scale-90 hover:shadow-md shadow-gray-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                />
              </svg>
              Report
            </p>
          </div>
        )}
        {/* content */}
        <div className="my-5">
          <img
            className="w-full object-cover max-h-96 mb-5"
            src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt=""
          />

          <p>{post.descripcion}</p>
        </div>
        {/* info */}
        <div className="flex items-center  gap-5">
          <div className="flex items-center gap-2 cursor-pointer text-sm">
            {liked ? (
              <FavoriteOutlinedIcon
                className="text-red-700"
                onClick={() => handleLikePost(post._id)}
              />
            ) : (
              <FavoriteBorderOutlinedIcon
                className="text-red-700"
                onClick={() => handleLikePost(post._id)}
              />
            )}
            {likeCount} Likes
          </div>
          <div
            className="flex items-center gap-2 cursor-pointer text-sm"
            onClick={() => setCommnetOpen(!commentOpen)}
          >
            <ChatBubbleOutlineRoundedIcon />
            {comm.length ? comm.length : ""} Comments
          </div>{" "}
          <div className="flex items-center gap-2 cursor-pointer text-sm">
            <SendRoundedIcon className="-rotate-45" />
          </div>
        </div>
        {commentOpen && <Comments setComm={setComm} postId={post._id} />}
      </div>
    </div>
  );
};

export default Post;
