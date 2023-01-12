import { Request, Response } from "express";
import userModel from "../model/userModel";
import postModel from "../model/postModel";

export const createPost = async (req: Request, res: Response) => {
  const { imageLinkss, desscription, userIdd } = req.body;
  try {
    const post = new postModel({
      userId: userIdd,
      descripcion: desscription,
      img: imageLinkss,
    });
    await post.save();
    return res.json({ message: "post uploaded successfully", success: true });
  } catch (error) {}
};

export const getPost = async (req: Request, res: Response) => {
  try {
    const allPosts = await postModel.find().populate("userId");
    return res.json({ data: allPosts.reverse(), success: true });
  } catch (error) {}
};

export const likePost = async (req: Request, res: Response) => {
  console.log("endayalyum ividay ethunnund");
  const id = req.params.postId;
  const userId = req.body.userIdd;
  try {
    const post=await postModel.findById(id)
    if(!post){
        return res.json({ message: "post not found",success:false});
    }
    
    if(!post.likes.includes(userId)){
        console.log(post,'ithall likepost');
        await post.updateOne({ $push: { likes: userId } });
        return res.json({message:"post liked successfully",success:true})
    }else{
        await post.updateOne({ $pull: { likes: userId } });
        return res.json({message:'post disliked successfully',success:true})
    }
    
  } catch (error) {
    console.log(error);
    
  }
};
