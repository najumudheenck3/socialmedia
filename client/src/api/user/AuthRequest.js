import toast from 'react-hot-toast'
import { userApi } from '../../utils/apiCall';


export const signUp=async(formData)=>{
  const {data}=await userApi.post('/register',formData)
  if(data.success){
    toast.success(data.message);
  }
}
export const logIn=async(formData)=>{
try {
  const {data}=await userApi.post('/login',formData)
  console.log(data);
  console.log(data.message);
  if(data.success){
    toast.success(data.message);
    localStorage.setItem("token",data.data)
    localStorage.setItem("userName",data.user)
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

export const verifyAccount=async(userId,token)=>userApi.put('/verify',{userId,token})