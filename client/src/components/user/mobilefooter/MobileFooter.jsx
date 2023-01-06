import React from 'react'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SlideshowOutlinedIcon from '@mui/icons-material/SlideshowOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

const MobileFooter = () => {
  return (
    <div className='flex sticky bottom-0 items-center border-t  px-8 py-4 h-12 mt-5 border-l-neutral-800 bg-white justify-between md:hidden'>
        <HomeOutlinedIcon/>
        <SearchOutlinedIcon/>
        <SlideshowOutlinedIcon/>
        <NotificationsNoneOutlinedIcon/>
        <AccountCircleOutlinedIcon/>
    </div>
  )
}

export default MobileFooter