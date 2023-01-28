import toast from 'react-hot-toast'
import { userApi } from '../../utils/apiCall';

export const postComment=async (postId,comment)=>{
    try {
        const {data}=await userApi.post(`/post-comment/${postId}`,{comment},{
            withCredentials: true,
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        if(data.success){
            const theComment={
                ...data.comment,
                userId:data.comment.userId._id,
                firstName:data.comment.userId.firstName,
                lastName:data.comment.userId.lastName
        
            }
            return theComment
        }
    } catch (error) {
        
    }
}

export const fetchComments=async(postId)=>{
    try {
        const {data}=await userApi.get(`/all-comments/${postId}`,{
            withCredentials: true,
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        if(data.success){
            console.log(data.comments,'hook ileakk povanullath');
            return data.comments
        }
    } catch (error) {
        
    }
}

export const postCommentReply=async(commentId,replyComment)=>{
    try {
        const {data}=await userApi.post(`/post-reply-comment/${commentId}`,{replyComment},{
            withCredentials: true,
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        // if(data.success){
        //     const theComment={
        //         ...data.comment,
        //         userId:data.comment.userId._id,
        //         firstName:data.comment.userId.firstName,
        //         lastName:data.comment.userId.lastName
        
        //     }
        //     return theComment
        // } 
    } catch (error) {
        
    }
}