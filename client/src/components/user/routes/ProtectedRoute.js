import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { userActions } from '../../../redux/userSlice'

const ProtectedRoute = (props) => {

    const dispatch=useDispatch()
    // const navigate=useNavigate()
    const getUser=()=>{
        console.log(localStorage.getItem('userName'),'ithannn');
        dispatch(userActions.setUserDetails({name:localStorage.getItem('userName'),token:localStorage.getItem('token')}))
    }

    useEffect(()=>{
        getUser()
    })
    if (localStorage.getItem('token')) {
        return props.children
    } else {
        return <Navigate to='/login' />
    }
}

export default ProtectedRoute