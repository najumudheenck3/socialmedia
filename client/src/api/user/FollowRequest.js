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

export const getAllRequest=async()=>{
  try {
    const {data}=await userApi.get('/get-all-request',{
      withCredentials: true,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
    return data.requests
  } catch (error) {
    
  }
}

export const acceptRequest=async(formData)=>{
  try {
    const {data}=await userApi.put('/accept-request',formData,{
      withCredentials: true,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
    return data.success
  } catch (error) {
    
  }
}

export const deleteRequest=async(deleteId )=>{
  try {
    const {data}=await userApi.delete(`/delete-request/${deleteId}`,{
      withCredentials: true,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
    return data.success
  } catch (error) {
    
  }
}

export const getAllFollowers=async(userId)=>{
  try {
    const {data}=await userApi.get(`/get-all-followers/${userId}`,{
      withCredentials: true,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
    if(data.success){
      return data.data
  }
  } catch (error) {
    
  }
}

export const getAllFollowing=async(userId)=>{
  try {
    const {data}=await userApi.get(`/get-all-following/${userId}`,{
      withCredentials: true,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
    if(data.success){
      return data.data
  }
  } catch (error) {
    
  }
}