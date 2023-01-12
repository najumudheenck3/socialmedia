import { useEffect, useState } from "react"
import { fetchComments } from "../api/user/CommentRequest"



const useFetchComments=(postId)=>{


    const [comments,setComments]=useState([])

    useEffect(()=>{

        const fetchCommetnsAll=async()=>{
           const response=await fetchComments(postId)
           console.log(response,'hook folder');
           setComments(response)
        }
        fetchCommetnsAll()
      
    },[]);

    return {comments,setComments}
}

export default useFetchComments;