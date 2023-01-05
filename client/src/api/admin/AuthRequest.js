import toast from 'react-hot-toast'
import { adminApi } from '../../utils/apiCall';



export const adminlogIn=async(formData)=>{
    try {
      const {data}=await adminApi.post('/login',formData)
      console.log(data);
      if(data.success){
        toast.success(data.message);
        localStorage.setItem("adminToken",data.data)
        localStorage.setItem("adminName",data.admin)
        return true
      }else{
        console.log('fail annnuu');
        toast.error(data.message);
        return false
      }
    } catch (error) {
      toast.error('erroor');
    }
    
    }
    