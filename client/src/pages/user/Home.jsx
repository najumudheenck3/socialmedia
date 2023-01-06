import React from 'react'
import Posts from '../../components/user/posts/Posts'
import Stories from '../../components/user/stories/Stories'

const Home = () => {
  return (
    <div >
      <Stories/>
      <Posts/>
    </div>
  )
}

export default Home