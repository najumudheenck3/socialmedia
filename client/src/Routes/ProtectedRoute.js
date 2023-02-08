import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { getUserProfile } from '../api/user/userRequest'
import { userActions } from '../redux/userSlice'

const ProtectedRoute = (props) => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user);
    console.log(user.userDetails, 'kkkk1');
    useEffect(() => {
        if (!user.userDetails && localStorage.getItem('token')) {
            let userInfo
            const getAddUserInfo = async () => {
                userInfo = await getUserProfile(localStorage.getItem('userId'))
                if (userInfo?.user) {
                    console.log(userInfo?.user, 'userInfo[0].userId');
                  await dispatch(userActions.setUserDetails(userInfo?.user))
                }

            }
            getAddUserInfo()

        }
    },[dispatch,user.userDetails])
    console.log(user.userDetails, 'kkkk');
    if (localStorage.getItem('token') && user.userDetails) {
        console.log('ullilund');
        return props.children
    
    } 
    if(!localStorage.getItem('token')){
        console.log('ividae varunnund');
        return <Navigate to='/login' />
    }
}

export default ProtectedRoute