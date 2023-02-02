import toast from 'react-hot-toast'
import { userApi } from '../../utils/apiCall';

export const uploadImage = async (data1) => {
    try {
        console.log(data1, "data");
        const {data}= await userApi.post('/post', data1, {
            withCredentials: true,
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
      if(data.success){
        toast.success(data.message);
        return data.success
      }
    } catch (error) {
        console.log(error);
    }
}

export const getAllPosts=async ()=>{
    try {
        const {data}=await userApi.get('/get-all-posts',{
            withCredentials: true,
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        if(data.success){
            return data.data
        }
    } catch (error) {
        console.log(error);
    }
}

export const likePost=async(postId)=>{
try {
    console.log(postId,'posst idddd');
    const {data}=await userApi.put(`/like-post/${postId}`,{},{
        withCredentials: true,
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
    })
} catch (error) {
    
}
}

export const savePost=async(postId)=>{
    try {
        const {data}=await userApi.put('/save-post',postId,{
            withCredentials: true,
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        return data.success
    } catch (error) {
        
    }
}

export const getAllSavedPost=async()=>{
    try {
        const {data}=await userApi.get('/all-save-post',{
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

export const deleteOnePost=async(postId)=>{
    try {
        const {data}=await userApi.delete(`/delete-post/${postId}`,{
            withCredentials: true,
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        return data.success
    } catch (error) {
        
    }
}

export const editPost=async(editPostData)=>{
    try {
        const {data}=await userApi.put('/edit-post',editPostData,{
            withCredentials: true,
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        if(data.success){
            toast.success(data.message);
            return data.success
        }
    } catch (error) {
        
    }
}

export const reportPost=async(reportData)=>{
try {
    const {data}=await userApi.post('/report-post',reportData,{
        withCredentials: true,
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
    })
} catch (error) {
    
}
}

export const uploadShorts = async (data1) => {
    try {
        console.log(data1, "data");
        const {data}= await userApi.post('/shorts', data1, {
            withCredentials: true,
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
      if(data.success){
        toast.success(data.message);
        return data.success
      }
    } catch (error) {
        console.log(error);
    }
}

export const getAllShorts=async ()=>{
    try {
        const {data}=await userApi.get('/get-all-shorts',{
            withCredentials: true,
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        if(data.success){
            return data.data
        }
    } catch (error) {
        console.log(error);
    }
}