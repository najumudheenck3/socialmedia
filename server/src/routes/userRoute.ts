import  express, { Router }  from "express";
const router:Router = express.Router();
import { loginUser, registerUser, verifyAccount } from "../controller/authController";
import { getAllPosts, postComment } from "../controller/commentController";
import { createPost, getPost, likePost } from "../controller/postController";
import { acceptRequest, deleteRequest, followUser, getAllFollowers, getAllFollowing, getAllRequest, getUserProfile, updateUserProfile } from "../controller/userController";
const authMiddeleware=require('../middleware/authMiddleware')

router.post('/register',registerUser)

router.post('/login',loginUser)

router.put('/verify',verifyAccount)

router.post('/post',authMiddeleware,createPost)

router.get('/get-all-posts',authMiddeleware,getPost)

router.get('/get-user-profile/:id',authMiddeleware,getUserProfile)

router.put('/like-post/:postId',authMiddeleware,likePost)

router.post('/post-comment/:postId',authMiddeleware,postComment)

router.get('/all-comments/:postId',authMiddeleware,getAllPosts)

router.put('/update-user-profile',authMiddeleware,updateUserProfile)

router.put('/follow-user',authMiddeleware,followUser)

router.get('/get-all-request',authMiddeleware,getAllRequest)

router.put('/accept-request',authMiddeleware,acceptRequest)

router.delete('/delete-request/:deleteId',authMiddeleware,deleteRequest)

router.get('/get-all-followers/:userId',authMiddeleware,getAllFollowers)

router.get('/get-all-following/:userId',authMiddeleware,getAllFollowing)

module.exports = router;
