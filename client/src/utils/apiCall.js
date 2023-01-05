import axios from "axios";

export const userApi=axios.create({
    baseURL:process.env.REACT_APP_URL,
  withCredentials: true
})

export const adminApi=axios.create({
    baseURL:`${process.env.REACT_APP_URL}/admin`,
  withCredentials: true
})