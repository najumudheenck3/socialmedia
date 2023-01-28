import toast from 'react-hot-toast'
import { userApi } from '../../utils/apiCall';

export const postComment = async (postId, comment) => {
    try {
        const { data } = await userApi.post(`/post-comment/${postId}`, { comment }, {
            withCredentials: true,
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        if (data.success) {
            const theComment = {
                ...data.comment,
                userId: data.comment.userId._id,
                firstName: data.comment.userId.firstName,
                lastName: data.comment.userId.lastName,
                profileImage:data.comment.userId.profileImage

            }
            return theComment
        }
    } catch (error) {

    }
}

export const fetchComments = async (postId) => {
    try {
        const { data } = await userApi.get(`/all-comments/${postId}`, {
            withCredentials: true,
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        if (data.success) {
            console.log(data.comments, 'hook ileakk povanullath');
            return data.comments
        }
    } catch (error) {

    }
}

export const postCommentReply = async (commentId, replyComment) => {
    try {
        const { data } = await userApi.post(`/post-reply-comment/${commentId}`, { replyComment }, {
            withCredentials: true,
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        if(data.success){
            const theReplyComment={
                ...data.replyComment,
                userId:data.replyComment.userId._id,
                firstName:data.replyComment.userId.firstName,
                lastName:data.replyComment.userId.lastName,
                profileImage:data.replyComment.userId.profileImage

            }
            return theReplyComment
        } 
    } catch (error) {

    }
}

export const getAllCommentReplies = async (commentId) => {

    try {
        const { data } = await userApi.get(`/all-comment-replies/${commentId}`, {
            withCredentials: true,
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        if (data.success) {
            return data.commentsReplies
        }
    } catch (error) {
        console.log(error);
    }

}

export const likePostComment=async(commentId)=>{
    try {
        const {data}=await userApi.put(`/like-comment/${commentId}`,{},{
            withCredentials: true,
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        }) 
    } catch (error) {
        
    }
}