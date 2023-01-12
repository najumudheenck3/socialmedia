import React, { useEffect, useState } from "react";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { likePost } from "../../../api/user/PostRequest";

const Post = ({ post }) => {
  const [commentOpen, setCommnetOpen] = useState(false);
  const [time,setTime]=useState('')
  const [liked, setLiked] = useState(false);
  const [likeCount,setLikeCount]=useState(15)
  //temporary
//setposttime
useEffect(()=>{
  var timeSince = function(date) {
    if (typeof date !== 'object') {
      date = new Date(date);
    }
  
    var seconds = Math.floor((new Date() - date) / 1000);
    var intervalType;
  
    var interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
      intervalType = 'year';
    } else {
      interval = Math.floor(seconds / 2592000);
      if (interval >= 1) {
        intervalType = 'month';
      } else {
        interval = Math.floor(seconds / 86400);
        if (interval >= 1) {
          intervalType = 'day';
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
      intervalType += 's';
    }
  
    return interval + ' ' + intervalType;
  };
 
setTime(timeSince(post.createdAt))
},[time])

//post liking
const handleLikePost=async()=>{
  try {
    // await likePost(id)
    setLiked(!liked)
    setLikeCount((prevCount) => {
      if (liked) {
        return prevCount - 1;
      } else {
        return prevCount + 1;
      }
    });
  } catch (error) {
    
  }
}
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
              <Link to={`/profile?id=${post.userId._id}`}>
                <span className="font-bold	">{post.userId.firstName}</span>
              </Link>
              <span className="text-xs">{time} ago</span>
            </div>
          </div>
          <MoreHorizOutlinedIcon />
        </div>

        {/* report */}
        {/* <div className="absolute z-50 top-16 right-16 rounded-bl-lg bg-white w-24">
          <h1>hhh</h1>
          <h1>hhh</h1>
          <h1>hhh</h1>
          <h1>hhh</h1>
          <h1>hhh</h1>
          <h1>hhh</h1>

        </div> */}
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
                onClick={() => handleLikePost()}
              />
            ) : (
              <FavoriteBorderOutlinedIcon
                className="text-red-700"
                onClick={() => handleLikePost()}
              />
            )}
            {likeCount} Likes
          </div>
          <div
            className="flex items-center gap-2 cursor-pointer text-sm"
            onClick={() => setCommnetOpen(!commentOpen)}
          >
            <ChatBubbleOutlineRoundedIcon />
            12 Comments
          </div>{" "}
          <div className="flex items-center gap-2 cursor-pointer text-sm">
            <SendRoundedIcon className="-rotate-45" />
          </div>
        </div>
        {commentOpen && <Comments />}
      </div>
    </div>
  );
};

export default Post;
