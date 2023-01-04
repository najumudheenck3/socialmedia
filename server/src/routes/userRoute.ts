import  express, { Router }  from "express";
const router:Router = express.Router();
import { loginUser, registerUser, verifyAccount } from "../controller/userController";

router.post('/register',registerUser)

router.post('/login',loginUser)

router.put('/verify',verifyAccount)


module.exports = router;
