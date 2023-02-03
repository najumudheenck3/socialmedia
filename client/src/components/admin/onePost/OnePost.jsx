import React from "react";

const Post = ({ post }) => {
  return (
    <div className="my-5m w-96 rounded-xl shadow-xl h-80 mx-auto mt-5">
      {post?.shorts? <video className="w-full object-cover max-h-96 mb-5" width="400" controls>
        <source src={post?.shorts} />
      </video>:<img
        className="w-full object-cover h-72   mb-1"
        src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
        alt=""
      />
     }
      <p>{post?.descripcion}</p>
    </div>
  );
};

export default Post;
