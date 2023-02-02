import  express, { Router }  from "express";
const router:Router = express.Router();
import { changeUserStatus, getAllUsers, loginAdmin } from "../controller/adminController";
import { getAllReportedPosts } from "../controller/postController";
const authMiddeleware=require('../middleware/authMiddleware')


router.post('/login',loginAdmin)

router.get('/get-all-users',authMiddeleware,getAllUsers)

router.post('/change-user-status',authMiddeleware,changeUserStatus)

router.get('/get-all-reported-posts',authMiddeleware,getAllReportedPosts)


module.exports = router;
