import Post from "../post/Post";
import DynamicFeedTwoToneIcon from "@mui/icons-material/DynamicFeedTwoTone";

const Posts = ({ posts }) => {
  return (
    <div className="flex flex-col  gap-12">
      {posts?.map((post) => (
        <Post post={post} key={post.id} />
      ))}
      {posts?.length === 0 && (
        <div className="bg-white p-5">
          <div className="flex flex-col items-center gap-y-4">
            <DynamicFeedTwoToneIcon />
            <h1 className="font-bold">There is no posts</h1>
          </div>{" "}
        </div>
      )}
    </div>
  );
};

export default Posts;
