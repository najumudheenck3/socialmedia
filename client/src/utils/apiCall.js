import axios from "axios";

export const userApi = axios.create({
  baseURL: process.env.REACT_APP_URL,
  withCredentials: true
})

export const adminApi = axios.create({
  baseURL: `${process.env.REACT_APP_URL}/admin`,
  withCredentials: true
})

export const cloudApi = axios.create({ 
  baseURL: `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_API}/image` 
})