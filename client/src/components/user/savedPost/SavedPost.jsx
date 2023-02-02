import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getAllSavedPost } from "../../../api/user/PostRequest";
import Post from "../post/Post";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";

const SavedPost = () => {
  const [savedPosts, setSavedPosts] = useState([]);
  useEffect(() => {
    const getSavedPost = async () => {
      const response = await getAllSavedPost();
      console.log(response, "respooooonse");
      if (response) {
        setSavedPosts(response);
      }
    };
    getSavedPost();
  }, []);

  return (
    <div className="flex flex-col gap-12">
      {savedPosts.length > 0 &&
        savedPosts?.map((savedPost) => (
          <Post post={savedPost} savedPost={true} key={savedPost.id} />
        ))}
      {savedPosts.length === 0 && (
        <div className=" p-10 bg-white shadow-md  rounded-lg flex flex-col items-center justify-center gap-y-6">
          <div className=" h-20 w-20 rounded-full border-2 border-specclr flex items-center justify-center">
            <BookmarkBorderOutlinedIcon
              fontSize="large"
              className="text-specclr"
            />
          </div>
          <div>
          <h1 className="text-center mb-4 text-2xl">Save</h1>
          <h1 className="text-center">Save Photos that you want to see again.Noone is <br></br> notified, and only you can see what you've saved.</h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedPost;
