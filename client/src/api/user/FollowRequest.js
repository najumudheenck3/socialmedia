import toast from 'react-hot-toast'
import {  userApi } from '../../utils/apiCall';

export const followUser=async(followingId)=>{
try {
    const {data}=await userApi.put('/follow-user',followingId,{
        withCredentials: true,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      return data
} catch (error) {
    
}
}