import React, { useEffect, useState } from "react";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import { useNavigate } from "react-router-dom";
import { deleteOnePost, likePost, savePost } from "../../../api/user/PostRequest";
import { useDispatch, useSelector } from "react-redux";
import Moment from "react-moment";
import { confirmAlert } from 'react-confirm-alert'; //alert
import 'react-confirm-alert/src/react-confirm-alert.css';  //alert
import HideSourceIcon from '@mui/icons-material/HideSource';
import { AddPostActions } from "../../../redux/postSlice";
import Comments from "../comments/Comments";
import { changePostStatus } from "../../../api/admin/PostRequest";

const Post = ({ post }) => {
  console.log(post?.isActive,'post?.isActivepost?.isActive');
  const dispatch=useDispatch()
  const [profImg] = useState(post?.userId.profileImage);
  const [postOptions, setPostOptions] = useState(false);
  const [commentOpen, setCommnetOpen] = useState(false);
  const [hide,setHide]=useState(post?.isActive)
  const [likeCount, setLikeCount] = useState(post?.likes.length);
  const [comm, setComm] = useState([]);
  const [savedStatus, setSavedStatus] = useState(
    true
  );
  const navigate = useNavigate();

    //saved and unsaved post handle
    const handleSavePost = async (postId) => {
      const response = await savePost({ postId });
      if (response) {
        setSavedStatus(!savedStatus);
      }
    };
    //go to profile page
    const toProfile = (userId) => {
      navigate("/admin/user-profile", { state: { id: userId } });
    };
    // delete post
    const changeStatus = async (postId) => {
      await changePostStatus(postId)
      setHide(!hide)
    };
  
  
    const handleDeleteAlert=(postId)=>{
      confirmAlert({
        title: 'Confirm to ',
        message: 'Are you change post status.',
        buttons: [
          { 
            label: 'Yes',
            onClick: () => {changeStatus(postId)}
          },
          {
            label: 'No',
          }
        ]
      });
    }
  return (
    <div className="post relative bg-white h-96 mx-auto w-2/3 shadow-md rounded-lg">
      <div className="containner p-5">
        {/* user */}
        <div className="flex items-center justify-between">
          <div className="flex gap-5">
            <img
              className="h-10 w-10 object-cover rounded-full"
              src={
                profImg
                  ? profImg
                  : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              }
              alt=""
            />
            <div className="flex flex-col">
              <span
                className="font-bold cursor-pointer"
                onClick={() => {
                  toProfile(post?.userId._id);
                }}
              >
                {post?.userId.firstName} {post?.userId.lastName}
              </span>
              <Moment className="self-center text-gray-500 text-xs" fromNow>
                {post?.createdAt}
              </Moment>
            </div>
          </div>
          <MoreHorizOutlinedIcon
            className="cursor-pointer"
            onClick={() => setPostOptions(!postOptions)}
          />
        </div>

        {/* report savedpost */}
        {postOptions && (
          <div className="absolute z-50 top-12 border right-12 p-2 font-semibold rounded-lg bg-white w-40">
            
           {!hide && <p
              href=""
              className="flex gap-3 py-2 my-2 cursor-pointer hover:bg-[#bbc0c7] -mx-2 px-2 rounded-md transition-all hover:scale-90 hover:shadow-md shadow-gray-400"
              onClick={()=>handleDeleteAlert(post?._id)}
            >
           <HideSourceIcon/>
             UnHide
            </p>}{hide && <p
              href=""
              className="flex gap-3 py-2 my-2 cursor-pointer hover:bg-[#bbc0c7] -mx-2 px-2 rounded-md transition-all hover:scale-90 hover:shadow-md shadow-gray-400"
              onClick={()=>handleDeleteAlert(post?._id)}
            >
           <HideSourceIcon/>
              Hide
            </p>}
          </div>
        )}
       
        {/* content */}
        <div className="my-5">
          <img
            className="w-full object-cover max-h-96 mb-5"
            src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt=""
          />

          <p>{post?.descripcion}</p>
        </div>
        {/* info */}
        <div className="flex items-center  gap-5">
          <div className="flex items-center gap-2  text-sm">
              <FavoriteBorderOutlinedIcon
                className="text-red-700"
              />
        
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
        {commentOpen && <Comments setComm={setComm} postId={post?._id} />}
      </div>
    
    </div>
  );
};

export default Post;
