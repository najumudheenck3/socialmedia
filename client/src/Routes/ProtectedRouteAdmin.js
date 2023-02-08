import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { adminActions } from '../redux/adminSlice'
const ProtectedRouteAdmin = (props) => {
    const dispatch = useDispatch()
    // const navigate=useNavigate()


    useEffect(() => {
        dispatch(adminActions.setadminDetails({ name: localStorage.getItem('adminName'), token: localStorage.getItem('adminToken') }));

    }, [dispatch]);
    
    const admin = useSelector((state) =>state.admin);
    console.log(admin, 'kkkk');
    if (localStorage.getItem('adminToken') &&admin.adminToken) {
        console.log('ullilund');
        return props.children
    } 
    if(!localStorage.getItem('adminToken') ){
        console.log('ividae varunnund');
        return <Navigate to='/admin/login' />
    }
}

export default ProtectedRouteAdmin