import  express, { Router }  from "express";
const router:Router = express.Router();
import { loginUser, registerUser, verifyAccount } from "../controller/authController";
import { getAllPosts, postComment, postCommentReply } from "../controller/commentController";
import {  getConversation, postNewConversation } from "../controller/conversationController";
import { addMessage, getMessage } from "../controller/messageContoller";
import { createPost, getAllSAvedPost, getPost, likePost, savePost } from "../controller/postController";
import { acceptRequest, deleteRequest, followUser, getAllFollowers, getAllFollowing, getAllRequest, getChatUser, getUserProfile, updateUserProfile } from "../controller/userController";
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

router.put('/save-post',authMiddeleware,savePost)

router.get('/all-save-post',authMiddeleware,getAllSAvedPost)

router.post('/new-conversation',authMiddeleware,postNewConversation)

router.get('/get-conversation/:userId',authMiddeleware,getConversation)

router.post('/add-message',authMiddeleware,addMessage)

router.get('/get-message/:conversationId',authMiddeleware,getMessage)

router.get('/get-chat-user/:friendId',authMiddeleware,getChatUser)

router.post('/post-reply-comment/:commentId',authMiddeleware,postCommentReply)


module.exports = router;
