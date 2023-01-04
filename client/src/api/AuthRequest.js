import axios from "axios";
import toast from 'react-hot-toast'


const API=axios.create({
    baseURL:process.env.REACT_APP_URL,
  withCredentials: true
})

export const signUp=async(formData)=>{
  const {data}=await API.post('/register',formData)
  console.log(data);
  console.log(data.message);
  if(data.success){
    toast.success(data.message);
  }
}
export const logIn=async(formData)=>{
try {
  const {data}=await API.post('/login',formData)
  console.log(data);
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

export const verifyAccount=async(userId,token)=>API.put('/verify',{userId,token})