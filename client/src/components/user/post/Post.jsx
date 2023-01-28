import React, { useEffect, useState } from "react";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import { useNavigate } from "react-router-dom";
import Comments from "../comments/Comments";
import { likePost, savePost } from "../../../api/user/PostRequest";
import { useSelector } from "react-redux";
import Moment from "react-moment";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const Post = ({ post }) => {
  const user = useSelector((state) => state.user.userDetails);
  const [userPost] = useState(post?.userId._id === user._id);
  const [profImg] = useState(post?.userId.profileImage);
  const [postOptions, setPostOptions] = useState(false);
  const [commentOpen, setCommnetOpen] = useState(false);
  const [liked, setLiked] = useState(post?.likes.includes(user._id));
  const [likeCount, setLikeCount] = useState(post?.likes.length);
  const [comm, setComm] = useState([]);
  const [savedStatus, setSavedStatus] = useState(
    user?.savedPost?.includes(post?._id)
  );
  const navigate = useNavigate();
  //setposttime
  useEffect(() => {
    setSavedStatus(user?.savedPost?.includes(post?._id));
  }, [post, user?.savedPost]);

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

  //saved and unsaved post handle
  const handleSavePost = async (postId) => {
    const response = await savePost({ postId });
    if (response) {
      setSavedStatus(!savedStatus);
    }
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
        {!userPost && postOptions && (
          <div className="absolute z-50 top-12 border right-12 p-2 font-semibold rounded-lg bg-white w-40">
            <div
              className="cursor-pointer"
              onClick={() => handleSavePost(post?._id)}
            >
              {savedStatus ? (
                <p
                  href=""
                  className="flex gap-3 py-2 my-2 hover:bg-[#bbc0c7] -mx-2 px-2 rounded-md transition-all hover:shadow-md shadow-gray-400"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="black"
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
              ) : (
                <p
                  href=""
                  className="flex gap-3  py-2 my-2 hover:bg-[#bbc0c7] -mx-2 px-2 rounded-md transition-all  hover:shadow-md shadow-gray-400"
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
              )}
            </div>
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
        {/* {edit post and delete post of user} */}
        {userPost && postOptions && (
          <div className="absolute z-50 top-12 border right-12 p-2 font-semibold rounded-lg bg-white w-40">
            <div className="cursor-pointer">
              <p
                href=""
                className="flex gap-3 py-2 my-2 hover:bg-[#bbc0c7] -mx-2 px-2 rounded-md transition-all hover:shadow-md shadow-gray-400"
              >
                <DriveFileRenameOutlineOutlinedIcon />
                Edit Post
              </p>
            </div>
            <p
              href=""
              className="flex gap-3 py-2 my-2 cursor-pointer hover:bg-[#bbc0c7] -mx-2 px-2 rounded-md transition-all hover:scale-90 hover:shadow-md shadow-gray-400"
            >
              <DeleteOutlineOutlinedIcon />
              Delete
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

          <p>{post?.descripcion}</p>
        </div>
        {/* info */}
        <div className="flex items-center  gap-5">
          <div className="flex items-center gap-2 cursor-pointer text-sm">
            {liked ? (
              <FavoriteOutlinedIcon
                className="text-red-700"
                onClick={() => handleLikePost(post?._id)}
              />
            ) : (
              <FavoriteBorderOutlinedIcon
                className="text-red-700"
                onClick={() => handleLikePost(post?._id)}
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
        {commentOpen && <Comments setComm={setComm} postId={post?._id} />}
      </div>
    </div>
  );
};

export default Post;
