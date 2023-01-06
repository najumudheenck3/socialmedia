import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { userActions } from '../../../redux/userSlice'

const ProtectedRoute = (props) => {
    const dispatch = useDispatch()
    // const navigate=useNavigate()

    
    useEffect(() => {
        dispatch(userActions.setUserDetails({ name: localStorage.getItem('userName'), token: localStorage.getItem('token') }))
    }, [dispatch])
    const user = useSelector((state) => state.user);
    console.log(user,'kkkk');
    if (localStorage.getItem('token')) {
        console.log('ullilund');
        return props.children
    } else {
        console.log('ividae varunnund');
        return <Navigate to='/login' />
    }
}

export default ProtectedRoute