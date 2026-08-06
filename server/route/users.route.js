import { Router } from "express";
import {
    registerUserController,
    verifyEmailController,
    loginUserController,
    logoutUserController,
    uploadAvatar,
    updateUserDetails,
    forgotPasswordController,
    verifyForgotPasswordOtp,
    resetPasswordController
} from "../controllers/user.controller.js";
import auth from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const userRouter = Router();
userRouter.post("/register", registerUserController);

userRouter.post('/verify-email', verifyEmailController);
userRouter.post('/login', loginUserController);
userRouter.get('/logout', auth, logoutUserController);
userRouter.put('/upload-avatar', auth, upload.single('avatar'), uploadAvatar);
userRouter.put('/update-user', auth, updateUserDetails);
userRouter.put('/forgot-password', forgotPasswordController);
userRouter.put('/verify-forgot-password-otp', verifyForgotPasswordOtp);
userRouter.put('/reset-password', resetPasswordController);
export default userRouter;