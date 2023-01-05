import  express, { Router }  from "express";
const router:Router = express.Router();
import { changeUserStatus, getAllUsers, loginAdmin } from "../controller/adminController";
const authMiddeleware=require('../middleware/authMiddleware')


router.post('/login',loginAdmin)

router.get('/get-all-users',authMiddeleware,getAllUsers)

router.post('/change-user-status',authMiddeleware,changeUserStatus)


module.exports = router;
