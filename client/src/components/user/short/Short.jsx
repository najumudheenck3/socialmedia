import React, { useEffect, useState } from "react";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import { useNavigate } from "react-router-dom";
import Comments from "../comments/Comments";
import {
  deleteOnePost,
  likePost,
  savePost,
} from "../../../api/user/PostRequest";
import { useDispatch, useSelector } from "react-redux";
import Moment from "react-moment";
import { confirmAlert } from "react-confirm-alert"; //alert
import "react-confirm-alert/src/react-confirm-alert.css"; //alert
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { AddPostActions } from "../../../redux/postSlice";
import EditPost from "../editPost/EditPost";
import ReportPost from "../reportPost/ReportPost";

const Short = ({ post, savedPost }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userDetails);
  const [userPost] = useState(post?.userId._id === user._id);
  const [profImg] = useState(post?.userId.profileImage);
  const [postOptions, setPostOptions] = useState(false);
  const [commentOpen, setCommnetOpen] = useState(false);
  const [liked, setLiked] = useState(post?.likes.includes(user._id));
  const [likeCount, setLikeCount] = useState(post?.likes.length);
  const [comm, setComm] = useState([]);
  const [editPostModal, setEditPostModal] = useState(false);
  const [reportPostModal, setReportPostModal] = useState(false);
  const [savedStatus, setSavedStatus] = useState(
    user?.savedPost?.includes(post?._id) || savedPost
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
  // delete post
  const deletePost = async (postId) => {
    const response = await deleteOnePost(postId);
    if (response) {
      dispatch(AddPostActions.postAdd());
      setPostOptions(!postOptions);
    }
  };

  const handleDeleteAlert = (postId) => {
    confirmAlert({
      title: "Confirm to ",
      message: "Are you delete your post.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            deletePost(postId);
          },
        },
        {
          label: "No",
        },
      ],
    });
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
              onClick={() => setReportPostModal(true)}
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
                onClick={() => setEditPostModal(true)}
              >
                <DriveFileRenameOutlineOutlinedIcon />
                Edit Post
              </p>
            </div>
            <p
              href=""
              className="flex gap-3 py-2 my-2 cursor-pointer hover:bg-[#bbc0c7] -mx-2 px-2 rounded-md transition-all hover:scale-90 hover:shadow-md shadow-gray-400"
              onClick={() => handleDeleteAlert(post?._id)}
            >
              <DeleteOutlineOutlinedIcon />
              Delete
            </p>
          </div>
        )}
        {/* content */}
        <div className="my-5">
          

          <video  className="w-full object-cover max-h-96 mb-5" width="400" controls>
            <source src={post?.shorts} />
          </video>

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
      {editPostModal && (
        <EditPost
          setPostOptions={setPostOptions}
          description={post?.descripcion}
          postId={post?._id}
          setEditPostModal={setEditPostModal}
          image={
            "data:image/jpeg;base64,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"
          }
        />
      )}
      {reportPostModal && (
        <ReportPost
          setReportPostModal={setReportPostModal}
          postId={post?._id}
        />
      )}
    </div>
  );
};

export default Short;
