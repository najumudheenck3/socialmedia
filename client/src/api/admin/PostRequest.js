import toast from 'react-hot-toast'
import { adminApi } from '../../utils/apiCall';

export const getAllReportedPosts=async ()=>{
    try {
        const {data}=await adminApi.get('/get-all-reported-posts', {
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

export const changePostStatus=async (postId)=>{
    try {
        const {data}=await adminApi.post('/change-post-status',{postId:postId},{
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