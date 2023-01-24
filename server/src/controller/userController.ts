import { Request, Response } from "express";
import postModel from "../model/postModel";
import userModel from "../model/userModel";

export const getUserProfile = async (req: Request, res: Response) => {
  console.log("ividae ethgumm");

  const id = req.params.id;
  try {
    const allPosts = await postModel.find({ userId: id }).populate("userId");

    return res.json({ data: allPosts.reverse(), success: true });
  } catch (error) {}
};

export const updateUserProfile = async (req: Request, res: Response) => {
  const userId = req.body.userIdd;
  try {
    const user = await userModel.findById(userId);
    const updateUser = await userModel.findByIdAndUpdate(user?._id, req.body, {
      new: true,
    });
    console.log(updateUser, "kkkkkkkkkkkkkkkkk");
    return res.json({
        data:updateUser,
        message: "profile updated successfully",
        success: true,
      });
  } catch (error) {
    console.log(error);
    return res.json({
        message: "something is wrong",
        success: false,
      });
  }
};
