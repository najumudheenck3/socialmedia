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
        
    }
}