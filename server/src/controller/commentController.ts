import { Request, Response } from "express";
import commentModel from "../model/commentModel";
import postModel from "../model/postModel";
import userModel from "../model/userModel";
import mongoose from "mongoose";

export const postComment = async (req: Request, res: Response) => {
  const comment = req.body.comment;
  const userId = req.body.userIdd;
  const postId = req.params.postId;
  try {
    const post = await postModel.findById(postId);
    if (!post) {
      return res.json({ message: "post not found", success: false });
    }
    const postComment = new commentModel({
      userId,
      postId,
      comment,
    });
    await postComment.save();

    await userModel.populate(postComment, {
      path: "userId",
      select: { firstName: 1,lastName:1 },
    });
    console.log(postComment, "postcomment aafter populate");
    // const theComment={
    //     ...postComment,
    //     userId:postComment.userId._id,
    //     firstName:postComment?.userId.firstName,
    //     lastName:postComment.userId.lastName

    // }
    // console.log(theComment,'the cinnebt');

    res.json({message:'commented posted successfully',success:true,comment:postComment})
    
  } catch (error) {}
};

export const getAllPosts = async (req: Request, res: Response) => {
  console.log(req.params, "endayaluym iviada etheeknn backinokkam");
  const postId = req.params.postId;
  try {
    const comments = await commentModel.aggregate([
      {
        $match: {
          postId: new mongoose.Types.ObjectId(postId),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "author",
        },
      },
      {
        $unwind: {
          path: "$author",
        },
      },
      {
        $project: {
          _id: 1,
          userId: 1,
          postId: 1,
          comment: 1,
          likes: 1,
          createdAt: 1,
          "author.firstName": 1,
          "author.lastName": 1,
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: ["$$ROOT", "$author"],
          },
        },
      },
      {
        $project: {
          author: 0,
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);
    console.log(comments, "allpost comments");
    return res.json({message:"comments fetched successfully", comments: comments, success: true });
  } catch (error) {
    console.log(error);
    return res.json({message:"something wrong when fetching comments",success:false})
    
  }
};
