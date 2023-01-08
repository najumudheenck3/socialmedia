import  express, { Router }  from "express";
const router:Router = express.Router();
import { loginUser, registerUser, verifyAccount } from "../controller/userController";
import { createPost, getPost } from "../controller/postController";
const authMiddeleware=require('../middleware/authMiddleware')

router.post('/register',registerUser)

router.post('/login',loginUser)

router.put('/verify',verifyAccount)

router.post('/post',authMiddeleware,createPost)

router.get('/get-all-posts',authMiddeleware,getPost)


module.exports = router;
