import { Request, Response } from "express";
import postModel from "../model/postModel";
import userModel from "../model/userModel";

export const getUserProfile=async (req: Request, res: Response)=>{
    const id=req.params.id
    try {
    const allPosts=await postModel.find({userId:id}).populate("userId")
 
    
    return res.json({data:allPosts.reverse(), success: true });
    
    } catch (error) {
        
    }
    
}