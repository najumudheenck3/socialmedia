import toast from 'react-hot-toast'
import { userApi } from '../../utils/apiCall';

export const getUserProfile=async(id)=>{
try {
    console.log(id,'prodilegeting id');
    const {data}=await userApi.get(`/get-user-profile/${id}`,{
        withCredentials: true,
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
    })
    console.log(data.data,'data.dataaa');
    if(data.success){
        return data.data
    }
} catch (error) {
    
}
}