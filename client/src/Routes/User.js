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
import ProtectedRoute from './ProtectedRoute'
import PublicRoute from './PublicRoute'
import MobileFooter from '../components/user/mobilefooter/MobileFooter'
import Messenger from '../pages/user/Messenger'
import Notifications from '../pages/user/Notifications'
import EditProfile from '../components/user/editProfile/EditProfile'
import Request from '../components/user/request/Request'
import Shorts from '../components/user/shorts/Shorts'
import Search from '../pages/user/Search'
import Settings from '../pages/user/Settings'


const User = () => {

  const Layout = () => {

    return (
      <div className='bg-slate-200'>
        <Navbar />
        <div className=' flex '>
          <LeftBar />
          <div className="flex w-6/12 ml-4 mt-2  max-md:w-full max-md:mx-2">
          <Outlet/>
          </div>
          <RightBar />
        </div>
      <MobileFooter/>
      </div>
    )
  }

  return (
    <>
    
      <Routes>
       <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}  >
          <Route path='' element={<Home/>}></Route>
          <Route path='profile' element={<Profile/>}></Route>
          <Route path='notifications' element={<Notifications/>}></Route>
          <Route path='edit-profile' element={<EditProfile/>}></Route>
          <Route path='friend-requests' element={<Request/>}></Route>
          <Route path='shorts' element={<Shorts/>}></Route>
          <Route path='search' element={<Search/>}></Route>
          <Route path='settings' element={<Settings/>}></Route>
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
      <Routes>
        <Route path="/messenger" element={<ProtectedRoute><Messenger /></ProtectedRoute>} />
      </Routes>
    </>
  )
}

export default User