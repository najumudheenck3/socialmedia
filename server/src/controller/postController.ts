import { Request, Response } from "express";
import userModel from "../model/userModel";
import postModel from "../model/postModel";

export const createPost=async (req:Request,res:Response)=>{
    
console.log(
    req.body,'hamras'
);
const {imageLinkss,desscription,userIdd}=req.body
try {
    const post=new postModel({
        userId:userIdd,
        descripcion:desscription,
        img:imageLinkss
    })
    await post.save()
    return res.json({message: "post uploaded successfully",success: true });
} catch (error) {
    
}

}

export const getPost=async(req:Request,res:Response)=>{
    try {
        const allPosts=await postModel.find().populate("userId")
        // console.log(allPosts,'allposts');
        return res.json({data:allPosts.reverse(), success: true });
    } catch (error) {
        
    }
}