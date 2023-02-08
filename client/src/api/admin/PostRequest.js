import toast from 'react-hot-toast'
import { adminApi } from '../../utils/apiCall';

export const getAllReportedPosts=async ()=>{
    try {
        const {data}=await adminApi.get('/get-all-reported-posts', {
            withCredentials: true,
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

export const changePostStatus=async (postId)=>{
    try {
        const {data}=await adminApi.post('/change-post-status',{postId:postId},{
            withCredentials: true,
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

export const fetchComments = async (postId) => {
    try {
        const { data } = await adminApi.get(`/all-comments/${postId}`, {
            withCredentials: true,
            headers: {
                Authorization: "Bearer " + localStorage.getItem("adminToken"),
            },
        })
        if (data.success) {
            console.log(data.comments, 'hook ileakk povanullath');
            return data.comments
        }
    } catch (error) {

    }
}


export const getAllCommentReplies = async (commentId) => {

    try {
        const { data } = await adminApi.get(`/all-comment-replies/${commentId}`, {
            withCredentials: true,
            headers: {
                Authorization: "Bearer " + localStorage.getItem("adminToken"),
            },
        })
        if (data.success) {
            return data.commentsReplies
        }
    } catch (error) {
        console.log(error);
    }

}

export const getAllNotifications = async () => {
    const { data } = await adminApi.get("/get-all-notifications",  {
      withCredentials: true,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("adminToken"),
      },
    });
    if(data.success){
        console.log(data.data,'notiffications');
        return data.data

    }
  
  }