import React from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'
import LeftBar from '../components/admin/leftBar/LeftBar'
import NavBar from '../components/admin/navBar/NavBar'
import Home from '../pages/admin/Home'
import Login from '../pages/admin/Login'
import UserList from '../pages/admin/UserList'

const Admin = () => {
  const Layout = () => {
    return (
      <div>
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
        <Route path="/" element={<Layout />}  >
          <Route path='' element={<Home/>}></Route>
          <Route path='user-list' element={<UserList/>}></Route>
        </Route>
      </Routes>
   <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
   </>
  )
}

export default Admin