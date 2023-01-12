import React, { useEffect, useState } from 'react'
import { getAllPosts } from '../../api/user/PostRequest';
import Posts from '../../components/user/posts/Posts'
import Stories from '../../components/user/stories/Stories'

const Home = () => {
  const [posts, setposts] = useState([]);
  let allPosts;
  useEffect(() => {
    const getPosts = async () => {
      allPosts = await getAllPosts();
      setposts(allPosts);
    };
   getPosts();
  }, []);
  console.log(posts, "allpost");
  return (
    <div >
      <Stories/>
      <Posts posts={posts}/>
    </div>
  )
}

export default Home