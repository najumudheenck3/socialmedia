import React from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'
import LeftBar from '../components/admin/leftBar/LeftBar'
import NavBar from '../components/admin/navBar/NavBar'
import ProtectedRouteAdmin from './ProtectedRouteAdmin'
import PublicRouteAdmin from './PublicRouteAdmin'
import Home from '../pages/admin/Home'
import Login from '../pages/admin/Login'
import UserList from '../pages/admin/UserList'
import ReportPost from '../pages/admin/ReportPost'
import ReportedUsers from '../components/admin/reportUsers/ReportedUsers'
import UserProfile from '../pages/admin/UserProfile'
import Notifications from '../pages/admin/Notifications'

const Admin = () => {
  const Layout = () => {
    return (
      <div className='bg-slate-200'>
        <NavBar />
        <div className='flex'>
          <LeftBar />
          <Outlet/>
        </div>
      </div>
    )
  }
  return (
   <>
    <Routes>
        <Route path="/" element={<ProtectedRouteAdmin><Layout /></ProtectedRouteAdmin>}  >
          <Route path='' element={<Home/>}></Route>
          <Route path='user-list' element={<UserList/>}></Route>
          <Route path='post-management' element={<ReportPost/>}></Route>
          <Route path='notifications' element={<Notifications/>}></Route>
          <Route path='report-detail' element={<ReportedUsers/>}></Route>
          <Route path='user-profile' element={<UserProfile/>}></Route>
        </Route>
      </Routes>
   <Routes>
        <Route path="/login" element={<PublicRouteAdmin><Login /></PublicRouteAdmin>} />
      </Routes>
   </>
  )
}

export default Admin