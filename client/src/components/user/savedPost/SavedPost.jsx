import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getAllSavedPost } from "../../../api/user/PostRequest";
import Post from "../post/Post";

const SavedPost = () => {
  const [savedPosts, setSavedPosts] = useState([]);
  useEffect(() => {
    const getSavedPost = async () => {
      const response = await getAllSavedPost();
      console.log(response,'respooooonse');
      if(response){
        setSavedPosts(response)
      }
    };
    getSavedPost();
  }, []);

  return <div className="flex flex-col gap-12">
  {savedPosts && savedPosts?.map((savedPost) => (
    <Post post={savedPost} key={savedPost.id} />
  ))}
</div>
};

export default SavedPost;
