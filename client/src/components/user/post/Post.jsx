import React, { useState } from "react";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";

const Post = ({ post }) => {
    const [commentOpen,setCommnetOpen]=useState(false)
  //temporary

  const [liked,setLiked]=useState(false)
  return (
    <div className="post  bg-white shadow-md rounded-lg">
      <div className="containner p-5">
        {/* user */}
        <div className="flex items-center justify-between">
          <div className="flex gap-5">
            <img
              className="h-10 w-10 object-cover rounded-full"
              src={post.profilePic}
              alt=""
            />
            <div className="flex flex-col">
              <Link to={`/profile/${post.userId}`}>
                <span className="font-bold	">{post.name}</span>
              </Link>
              <span className="text-xs">1 min ago </span>
            </div>
          </div>
          <MoreHorizOutlinedIcon />
        </div>
        {/* content */}
        <div className="my-5">
          <img
            className="w-full object-cover max-h-96 mb-5"
            src={post.img}
            alt=""
          />
          <p>Lorem ipsum dolor sit amet consectetur adipisicing e</p>
        </div>
        {/* info */}
        <div className="flex items-center  gap-5">
          <div className="flex items-center gap-2 cursor-pointer text-sm"  >
            {liked ? <FavoriteOutlinedIcon className="text-red-700" onClick={()=>setLiked(!liked)}/> : <FavoriteBorderOutlinedIcon className="text-red-700" onClick={()=>setLiked(!liked)} />}
            12 Likes
          </div>
          <div  className="flex items-center gap-2 cursor-pointer text-sm" onClick={()=>setCommnetOpen(!commentOpen)}>
          <ChatBubbleOutlineRoundedIcon/>
            12 Comments
          </div>{" "}
          <div  className="flex items-center gap-2 cursor-pointer text-sm">
            <SendRoundedIcon className="-rotate-45"/>
           
          </div>
        </div>
        {commentOpen && <Comments/>}
      </div>
    </div>
  );
};

export default Post;
