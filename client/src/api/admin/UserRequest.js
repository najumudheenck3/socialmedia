import toast from 'react-hot-toast'
import { adminApi } from '../../utils/apiCall';

export const getAllUsers=async ()=>{
    try {
        const {data}=await adminApi.get('/get-all-users', {
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