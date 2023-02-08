import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getAllPosts } from '../../api/user/PostRequest';
import Posts from '../../components/user/posts/Posts'
import Stories from '../../components/user/stories/Stories'

const Home = () => {
  const postUpdateRefresh=useSelector((state) => state.addPost.AddPost)
  const [posts, setposts] = useState([]);
  let allPosts;
  useEffect(() => {
    const getPosts = async () => {
      allPosts = await getAllPosts();
      setposts(allPosts);
    };
   getPosts();
  }, [postUpdateRefresh===true]);
  console.log(posts, "allpost");
  return (
    <div className='w-full'>
      {/* <Stories/> */}
      <Posts posts={posts}/>
    </div>
  )
}

export default Home