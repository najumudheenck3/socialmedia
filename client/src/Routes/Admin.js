import React from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'
import LeftBar from '../components/admin/leftBar/LeftBar'
import NavBar from '../components/admin/navBar/NavBar'
import ProtectedRouteAdmin from '../components/admin/routes/ProtectedRouteAdmin'
import PublicRouteAdmin from '../components/admin/routes/PublicRouteAdmin'
import Home from '../pages/admin/Home'
import Login from '../pages/admin/Login'
import UserList from '../pages/admin/UserList'

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
        </Route>
      </Routes>
   <Routes>
        <Route path="/login" element={<PublicRouteAdmin><Login /></PublicRouteAdmin>} />
      </Routes>
   </>
  )
}

export default Admin