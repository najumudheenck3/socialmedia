import toast from 'react-hot-toast'
import { adminApi } from '../../utils/apiCall';

export const getAllUsers=async ()=>{
    try {
        const {data}=await adminApi.get('/get-all-users', {
            withCredentials: true,
            headers: {
               Authorization: "Bearer " + localStorage.getItem("adminToken"),
            },
        })
        if(data.success){
            return data.data
        }else{
            toast.error(data.message);
            return false
        }
    } catch (error) {
        console.log(error);
    }
}

export const changeUserStatus=async (userId)=>{
    try {
        const {data}=await adminApi.post('/change-user-status',{userId:userId},{
            withCredentials: true,
            headers: {
               Authorization: "Bearer " + localStorage.getItem("adminToken"),
            },
        })
        if(data.success){
            toast.success(data.message);
            return data.data
        }else{
            toast.error(data.message);
            return false
        }
    } catch (error) {
        console.log('dkljfldkferrroor');
    }
}

export const getUserProfile = async (id) => {
    try {
      console.log(id, 'prodilegeting id');
      const { data } = await adminApi.get(`/get-user-profile/${id}`, {
        withCredentials: true,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("adminToken"),
        },
      })
      if (data.success) {
        return data.data
      }
    } catch (error) {
  
    }
  }

  export const getAllFollowers=async(userId)=>{
    try {
      const {data}=await adminApi.get(`/get-all-followers/${userId}`,{
        withCredentials: true,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("adminToken"),
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
      const {data}=await adminApi.get(`/get-all-following/${userId}`,{
        withCredentials: true,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("adminToken"),
        },
      })
      if(data.success){
        return data.data
    }
    } catch (error) {
      
    }
  }

  export const fetDashboardDetails=async ()=>{
    try {
      const {data}=await adminApi.get(`/get-details`,{
        withCredentials: true,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("adminToken"),
        },
      })
      if(data.success){
        return data
    }
    } catch (error) {
      
    }
  }