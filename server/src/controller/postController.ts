import { Request, Response } from "express";
import userModel from "../model/userModel";
import postModel from "../model/postModel";
import mongoose from "mongoose";

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
  const id = req.params.postId;
  const userId = req.body.userIdd;
  try {
    const post = await postModel.findById(id);
    if (!post) {
      return res.json({ message: "post not found", success: false });
    }

    if (!post.likes.includes(userId)) {
      console.log(post, "ithall likepost");
      await post.updateOne({ $push: { likes: userId } });
      return res.json({ message: "post liked successfully", success: true });
    } else {
      await post.updateOne({ $pull: { likes: userId } });
      return res.json({ message: "post disliked successfully", success: true });
    }
  } catch (error) {
    console.log(error);
  }
};

export const savePost = async (req: Request, res: Response) => {
  const postId = req.body.postId;
  const userId = req.body.userIdd;
  try {
    const user = await userModel.findById(userId);
    if (!user) {
      res.json({ message: "user no exist", success: false });
    } else {
      if (!user?.savedPost.includes(postId)) {
        await user.updateOne({
          $push: { savedPost: new mongoose.Types.ObjectId(postId) },
        });
        res.json({ Message: "post saved successfully", success: true });
      } else {
        await user.updateOne({
          $pull: { savedPost: new mongoose.Types.ObjectId(postId) },
        });
        res.json({ Message: "post unsaved successfully", success: true });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllSAvedPost = async (req: Request, res: Response) => {
  console.log(req.body, "endayalyum ividay ethunnund");
  const userId = req.body.userIdd;
  try {
    const user = await userModel
      .findById(userId)
      .populate([
        {
          path: "savedPost",
          populate: {
            path: "userId",
            select: { firstName: 1, lastName: 1, profileImage: 1 },
          },
        },
      ]);
    console.log(user?.savedPost, "userrrrrrrrrrrrrrrrrrrrrr");
    res.json({ Message: "saved post data fetched successfully",data:user?.savedPost, success: true });
  } catch (error) {}
};
