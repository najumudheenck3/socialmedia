import React from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'
import LeftBar from '../components/user/leftBar/LeftBar'
import Navbar from '../components/user/nvabar/Navbar'
import RightBar from '../components/user/rightBar/RightBar'
import Home from '../pages/user/Home'
import Login from '../pages/user/Login'
import Register from '../pages/user/Register'
import Profile from '../pages/user/Profile'
import Verify from '../pages/user/Verify'
import ProtectedRoute from '../components/user/routes/ProtectedRoute'
import PublicRoute from '../components/user/routes/PublicRoute'


const User = () => {

  const Layout = () => {

    return (
      <div className='bg-slate-200'>
        <Navbar />
        <div className=' flex '>
          
          <LeftBar />
          <div className="flex w-6/12 ml-4 mt-2  max-md:w-full">
          <Outlet/>
          </div>
          <RightBar />
        </div>
      </div>
    )
  }

  return (
    <>
    
      <Routes>
       <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}  >
          <Route path='' element={<Home/>}></Route>
          <Route path='profile/:id' element={<Profile/>}></Route>
        </Route>
      </Routes>
      <Routes>
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      </Routes>
      <Routes>
        <Route path="/register" element={<Register />} />
      </Routes>
      <Routes>
        <Route path="/verify" element={<Verify/>} />
      </Routes>
      
    </>
  )
}

export default User