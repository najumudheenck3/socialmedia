import { Request, Response } from "express";
import postModel from "../model/postModel";
import userModel from "../model/userModel";

export const getUserProfile=async (req: Request, res: Response)=>{
    console.log('llllllllhhhhhhgggg');    
    const id=req.params.id
    console.log(id,'idddd');
    try {
    const allPosts=await postModel.find({userId:id}).populate("userId")
    console.log(allPosts,'allpostsm,mmm');
 
    
    return res.json({data:allPosts.reverse(), success: true });
    
    } catch (error) {
        
    }
    
}