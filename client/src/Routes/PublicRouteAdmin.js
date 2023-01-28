import React from 'react'
import { Navigate } from 'react-router-dom'

const PublicRouteAdmin = (props) => {
    if(localStorage.getItem('adminToken')){
        return <Navigate to='/admin'/>
    }else{
        return props.children
    }
}

export default PublicRouteAdmin