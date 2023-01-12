import  express, { Router }  from "express";
const router:Router = express.Router();
import { loginUser, registerUser, verifyAccount } from "../controller/authController";
import { getAllPosts, postComment } from "../controller/commentController";
import { createPost, getPost, likePost } from "../controller/postController";
import { getUserProfile } from "../controller/userController";
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


module.exports = router;
