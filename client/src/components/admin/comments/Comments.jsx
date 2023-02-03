import React, { useEffect, useState } from "react";
import { postComment } from "../../../api/user/CommentRequest";
import InputEmoji from "react-input-emoji";
import Comment from "../comment/Comment";
import { fetchComments } from "../../../api/admin/PostRequest";

const Comments = ({ postId, setComm }) => {
  const [newComment, setNewComment] = useState("");
  const [comments,setComments]=useState([])
 useEffect(()=>{
  const fetchCommetnsAll=async()=>{
    const response=await fetchComments(postId)
    console.log(response,'hook folder');
    setComments(response)
 }
 fetchCommetnsAll()
 },[])
  setComm(comments);
  console.log(comments, "ividyum kitttiii");
  const handlePostComment = async () => {
    if (newComment.trim().length < 0) return;
    console.log(newComment.trim());
    try {
      const response = await postComment(postId, newComment.trim());
      console.log(response, "the cinnebt");
      setComments([response, ...comments]);
      setComm([response, ...comments]);
    } catch (error) {
      console.log(error);
    }
    setNewComment("");
  };

  return (
    <div>
      
      <div className="h-64 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-thumb-rounded-full  overflow-y-scroll ">
        {comments.map((comment) => (
          <Comment comment={comment} key={comment._id}/>
        ))}
      </div>
    </div>
  );
};

export default Comments;
