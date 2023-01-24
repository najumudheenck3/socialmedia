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

export const followUser=async (req: Request, res: Response) =>{
    console.log(req.body,'ini pani thudangam');
    try {
        const userId=req.body.userIdd
        const followingUserId=req.body.followingId
        const followUser=await userModel.findById(followingUserId)
        const currentUser=await userModel.findById(userId)
        console.log(followUser,currentUser);
        if(!currentUser){
            res.json({ message: " user not exist", success: false });
           
            
        }
        if(!followUser){
            res.json({ message: "following user not exist", success: false });
        }
        
        if(!followUser?.private){
            console.log('1');
            if(!followUser?.followers?.includes(userId)){
                console.log('2');
                await followUser?.updateOne({$push:{followers:currentUser?._id}})
                await currentUser?.updateOne({$push:{following:followUser?._id}})
                res.json({ message: "followed new user succesfully", success: true });
            }else{
                console.log('3');
                await followUser?.updateOne({$pull:{followers:currentUser?._id}})
                await currentUser?.updateOne({$pull:{following:followUser?._id}})
                res.json({ message: "unfollwed user succesfully", success: true });
            }
        }else{
            console.log('4');
            if(followUser?.followers?.includes(userId)){
                console.log('5');
                await followUser?.updateOne({$pull:{followers:currentUser?._id}})
                await currentUser?.updateOne({$pull:{following:followUser?._id}})
                res.json({ message: "unfollwed user succesfully", success: true });
            }else{
                console.log('6');
                if(!followUser?.requests?.includes(userId)){
                    console.log('7');
                    await followUser?.updateOne({$push:{requests:currentUser?._id}}) 
                    res.json({ message: "request new user successfully", success: true });
                }else{
                    await followUser?.updateOne({$pull:{requests:currentUser?._id}}) 
                    res.json({ message: "unrequest new user successfully", success: true });
                }
            }
        }
        
    } catch (error) {
        console.log(error);
        
    }
}
