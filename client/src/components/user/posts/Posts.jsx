
import Post from "../post/Post";

const Posts = ({posts}) => {
  
 

  return (
    <div className="flex flex-col gap-12">
      {posts?.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
};

export default Posts;
