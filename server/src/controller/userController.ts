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
      data: updateUser,
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

export const followUser = async (req: Request, res: Response) => {
  try {
    const userId = req.body.userIdd;
    const followingUserId = req.body.followingId;
    const followUser = await userModel.findById(followingUserId);
    const currentUser = await userModel.findById(userId);
    console.log(followUser, currentUser);
    if (!currentUser) {
      res.json({ message: " user not exist", success: false });
    }
    if (!followUser) {
      res.json({ message: "following user not exist", success: false });
    }

    if (!followUser?.private) {
      console.log("1");
      if (!followUser?.followers?.includes(userId)) {
        console.log("2");
        await followUser?.updateOne({ $push: { followers: currentUser?._id } });
        await currentUser?.updateOne({ $push: { following: followUser?._id } });
        res.json({ message: "followed new user succesfully", success: true });
      } else {
        console.log("3");
        await followUser?.updateOne({ $pull: { followers: currentUser?._id } });
        await currentUser?.updateOne({ $pull: { following: followUser?._id } });
        res.json({ message: "unfollwed user succesfully", success: true });
      }
    } else {
      console.log("4");
      if (followUser?.followers?.includes(userId)) {
        console.log("5");
        await followUser?.updateOne({ $pull: { followers: currentUser?._id } });
        await currentUser?.updateOne({ $pull: { following: followUser?._id } });
        res.json({ message: "unfollwed user succesfully", success: true });
      } else {
        console.log("6");
        if (!followUser?.requests?.includes(userId)) {
          console.log("7");
          await followUser?.updateOne({
            $push: { requests: currentUser?._id },
          });
          res.json({ message: "request new user successfully", success: true });
        } else {
          await followUser?.updateOne({
            $pull: { requests: currentUser?._id },
          });
          res.json({
            message: "unrequest new user successfully",
            success: true,
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllRequest = async (req: Request, res: Response) => {
  const userId = req.body.userIdd;
  try {
    const requests = await userModel.findById(userId).populate({
      path: "requests",
      select: { firstName: 1, lastName: 1, profileImage: 1 },
    });

    res.json({
      message: "request data fetched successfully",
      requests: requests?.requests,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const acceptRequest = async (req: Request, res: Response) => {
  const userId = req.body.userIdd;
  const acceptId = req.body.userId;
  try {
    const user = await userModel.findById(userId);
    const acceptedUser = await userModel.findById(acceptId);
    if (!user) {
      res.json({ message: "user no exist", success: false });
    }
    if (!acceptedUser) {
      res.json({ message: "requested user not exist", success: false });
    }
    if (user?.requests?.includes(acceptId)) {
      await user.updateOne({ $pull: { requests: acceptId } });
      await user.updateOne({ $push: { followers: acceptId } });
      await acceptedUser?.updateOne({ $push: { following: userId } });
    }
    res.json({
      message: "following request accept successfully ",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteRequest = async (req: Request, res: Response) => {
  const userId = req.body.userIdd;
  const deleteId = req.params.deleteId;
  try {
    const user = await userModel.findById(userId);
    if (!user) {
      res.json({ message: "user no exist", success: false });
    }
    if (user?.requests?.includes(deleteId)) {
      await user.updateOne({ $pull: { requests: deleteId } });
      res.json({
        message: "friend request cancel successfully",
        success: true,
      });
    } else {
      res.json({
        message: "something wrong",
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllFollowers = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  try {
    const user = await userModel.findById(userId).populate({
        path: "followers",
        select: { firstName: 1, lastName: 1, profileImage: 1 },
      });

      res.json({ message: "followers fetched successfully", data: user?.followers ,success:true});
      
  } catch (error) {
    console.log(error);
  }
};

export const getAllFollowing=async(req: Request, res: Response)=>{
    console.log(req.body, "ini pani thudangammm");
    const userId =req.params.userId;
    try {
        const user = await userModel.findById(userId).populate({
            path: "following",
            select: { firstName: 1, lastName: 1, profileImage: 1 },
          });
          res.json({ message: "following users fetched successfully", data: user?.following ,success:true});
    } catch (error) {
        console.log(error);
    }
}
