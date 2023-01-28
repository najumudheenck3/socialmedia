import toast from 'react-hot-toast'
import { userApi } from '../../utils/apiCall';

export const getAllConversations = async (userId) => {
    try {
        const { data } = await userApi.get(`/get-conversation/${userId}`, {
            withCredentials: true,
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        if (data.success) {
            return data.conversation
        }
    } catch (error) {
        console.log(error);
    }
}

export const getChatUser = async (friendId) => {
    try {
        const { data } = await userApi.get(`/get-chat-user/${friendId}`, {
            withCredentials: true,
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        if (data.success) {
            return data.data
        }

    } catch (error) {
        console.log(error);
    }
}

export const getAllMessages=async(currentChatId)=>{
    try {
        const { data } = await userApi.get(`/get-message/${currentChatId}`, {
            withCredentials: true,
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        if (data.success) {
            return data.allMessages
        }
    } catch (error) {
        console.log(error);
    }
}

export const addNewMessage=async(formData)=>{
    try {
        const {data}=await userApi.post('/add-message',formData,{
            withCredentials: true,
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        if (data.success) {
            return data.saveMessage
        }
    } catch (error) {
        
    }
}