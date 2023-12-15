import express from 'express';
import AuthController from '../controllers/Auth.controller.js';
import { upload } from '../utils/multer.js';
import { AuthValidation } from '../validations/Auth.validation.js';
import { Vaidation } from '../middlewares/Validation.js';
import { VerifyToken } from '../middlewares/VerifyToken.js';

const router = express.Router()


router.route("/register")
.post(upload.single("image"),AuthValidation.RegisterUser,Vaidation,AuthController.RegisterUser)


router.route("/login")
.post(AuthValidation.loginUser,Vaidation,AuthController.LoginUser)



router.route("/profile")
.get(VerifyToken,AuthController.Profile)
.put(upload.single("image"),VerifyToken,AuthValidation.UpdateProfile,Vaidation,AuthController.UpdateProfile)




router.route("/forget-password")
.post(AuthValidation.ForgetPassword,Vaidation,AuthController.ForgetPassword)



router.route("/update-password")
.put(AuthValidation.UpdatePassword,Vaidation,AuthController.UpdatePassword)




export default router;