import bcrypt from "bcryptjs";
import sendEmail from "../config/sendEmail.js";
import UserModel from "../models/user.model.js";
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js";
import generateAccessToken from "../utils/generateAccessToken.js";
import generateRefreshToken from "../utils/generateRefreshToken.js";
import uploadImageCloudinary from "../utils/uploadImageCloudinary.js";
import forgotPasswordTemplate from "../utils/forgotPasswordTemplate.js";
import generateOTP from "../utils/generateOTP.js";
import jwt from "jsonwebtoken";

export async function registerUserController(request, response) {
    try {
        const { name, email, password } = request.body;

        if (!name || !email || !password) {
            return response.status(400).json({
                message: "Name, email, and password are required.",
                error: true,
                success: false
            });
        }

        const user = await UserModel.findOne({ email });
        if (user) {
            return response.status(400).json({
                message: "User with this email already exists.",
                error: true,
                success: false
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const payload = {
            name,
            email,
            password: hashPassword
        };

        const newUser = new UserModel({ ...payload, isVerified: true, verify_email: true, status: "active" });
        const savedUser = await newUser.save();

        // Try to send verification email but don't fail registration if it errors
        try {
            const verifyEmailUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/verify-email?codes=${savedUser._id}`;
            await sendEmail({
                sendTo: email,
                subject: "Verify Email From TECHX",
                html: verifyEmailTemplate(name, verifyEmailUrl)
            });
        } catch (emailError) {
            console.warn("Verification email could not be sent:", emailError.message);
        }

        return response.json({
            message: "User registered successfully.",
            error: false,
            success: true,
            data: { _id: savedUser._id, name: savedUser.name, email: savedUser.email }
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

export async function verifyEmailController(request, response) {
    try {
        const { codes } = request.body;

        const user = await UserModel.findOne({ _id: codes });
        if (!user) {
            return response.status(400).json({
                message: "Invalid verification code.",
                error: true,
                success: false
            });
        }  
        
        const updatedUser = await UserModel.updateOne({ _id: codes }, { isVerified: true });

        return response.json({
            message: "Email verified successfully.",
            error: false,
            success: true
        });
    } 
    catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}
// login controller

export async function loginUserController(request, response) {
    try {
        const { email, password } = request.body;

        const user = await UserModel.findOne({ email });
        if (!user) {
            return response.status(400).json({
                message: "User with this email does not exist.",
                error: true,
                success: false
            });
        }

        if (user.status && user.status.toLowerCase() !== "active") {
            return response.status(400).json({
                message: "Your account is not active. Please contact support.",
                error: true,
                success: false
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return response.status(400).json({
                message: "Invalid password.",
                error: true,
                success: false
            });
        }

        // skip email verification check in dev if isVerified defaults to true

       

        const accessToken = await generateAccessToken(user._id);
        response.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 5 * 60 * 60 * 1000 // 5 hours
        });

        const refreshToken = await generateRefreshToken(user._id);

        response.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        return response.json({
            message: "Login successful.",
            error: false,
            success: true,
            data: {
                accessToken,
                refreshToken,
                user: { _id: user._id, name: user.name, email: user.email, avatar: user.avatar, role: user.role }
            }
        });


    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }    }   

  // LOGOUT CONTROLLER

export async function logoutUserController(request, response) {
    try {
        const userId = request.userId;
        const cookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        };
        response.clearCookie("accessToken", "", { ...cookieOptions, maxAge: 0 });
        response.clearCookie("refreshToken", "", { ...cookieOptions, maxAge: 0 });

        const removeRefreshTokenResult = await UserModel.updateOne({ _id: userId }, { $unset: { refreshToken: "" } });


        return response.json({
            message: "Logout successful.",
            error: false,
            success: true
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }     
}

//upload user avtar
export async function uploadAvatar(request, response) {
    try {
        const userId = request.userId;
        const image =request.file;

        const upload = await uploadImageCloudinary(image);

        const updateUser = await UserModel.findByIdAndUpdate(userId, { avatar: upload.url }, { new: true }); 
        

        return response.json({
            message: "Avatar uploaded successfully.",
            data: {
                _id : userId,
                avatar :upload.url
            }
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}
//update userdetails
//update userdetails
export async function updateUserDetails(request, response) {
    try {
        const userId = request.userId;
        const { name, email, mobile, password } = request.body;

        let passwordVar = password;
        if (passwordVar) {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(passwordVar, salt);
            passwordVar = hashPassword;
        }

        const updateUser = await UserModel.findByIdAndUpdate(userId,
            {
                ...(name && { name }),
                ...(email && { email }),
                ...(mobile && { mobile }),
                ...(passwordVar && { password: passwordVar })
            }, { new: true });

        return response.json({
            message: "User details updated successfully.",
            data: updateUser
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}
// forgot password: request an OTP
export async function forgotPasswordController(request, response) {
    try {
        const { email } = request.body;
        if (!email) {
            return response.status(400).json({ message: "Email is required.", error: true, success: false });
        }
        const user = await UserModel.findOne({ email });
        if (!user) {
            return response.status(400).json({ message: "User with this email does not exist.", error: true, success: false });
        }

        const otp = generateOTP();
        const expireTime = Date.now() + 10 * 60 * 1000; // 10 minutes

        await UserModel.findByIdAndUpdate(user._id, {
            forgotPasswordOtp: otp,
            otpExpireTime: new Date(expireTime).toISOString()
        });

        await sendEmail({
                sendTo: email,
                subject: "Password Reset OTP from TECHX",
                html: forgotPasswordTemplate({ name: user.name, otp })
             })



        return response.json({
            message: "check your email for the OTP to reset password",
            error: false,
            success: true
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

// verify forgot password otp
export async function verifyForgotPasswordOtp(request, response) {
    try {
        const { email, otp } = request.body;
        if (!email || !otp) {
            return response.status(400).json({
                message: "Email and OTP are required.",
                error: true,
                success: false
            });
        }

        const user = await UserModel.findOne({ email });
        if (!user) {
            return response.status(400).json({
                message: "User with this email does not exist.",
                error: true,
                success: false
            });
        }

            const currentTime = Date.now();
            if (user.forgotPasswordOtp !== otp || currentTime > new Date(user.otpExpireTime).getTime()) {
                return response.status(400).json({
                    message: "Invalid or expired OTP.",
                    error: true,
                    success: false
                });
            }

            return response.json({
                message: "OTP verified successfully. You can now reset your password.",
                error: false,
                success: true
            });
        } catch (error) {
            return response.status(500).json({
                message: error.message || error,
                error: true,
                success: false
            });
        }
    }

// reset password using OTP
export async function resetPasswordController(request, response) {
    try {
        const { email, otp, newPassword, confirmPassword } = request.body;
        if (!email || !otp || !newPassword || !confirmPassword) {
            return response.status(400).json({ message: "Email, OTP, new password and confirm password are required.", error: true, success: false });
        }
        if (newPassword !== confirmPassword) {
            return response.status(400).json({ message: "Passwords do not match.", error: true, success: false });
        }

        const user = await UserModel.findOne({ email });
        if (!user) {
            return response.status(400).json({ message: "User with this email does not exist.", error: true, success: false });
        }
        if (user.forgotPasswordOtp !== otp || Date.now() > new Date(user.otpExpireTime).getTime()) {
            return response.status(400).json({ message: "Invalid or expired OTP.", error: true, success: false });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(newPassword, salt);
        await UserModel.findByIdAndUpdate(user._id, { password: hashPassword, forgotPasswordOtp: null, otpExpireTime: null });

        return response.json({ message: "Password reset successfully.", error: false, success: true });
    } catch (error) {
        return response.status(500).json({ message: error.message || error, error: true, success: false });
    }
}

// refresh token controller
export async function refreshToken(request, response) {
    try {
        const refreshToken = request.cookies?.refreshToken || request.headers?.authorization?.split(" ")[1];
        if (!refreshToken) return response.status(401).json({ message: "Refresh token is required.", error: true, success: false });
        const refreshSecret = process.env.SECRET_KEY_REFRESH_TOKEN || process.env.JWT_REFRESH_SECRET || "techx_refresh_secret_key_2026";
        const verifyToken = jwt.verify(refreshToken, refreshSecret);
        if (!verifyToken) return response.status(401).json({ message: "Invalid refresh token.", error: true, success: false });
        const userId = verifyToken.userId || verifyToken.id || verifyToken._id;
        const newAccessToken = await generateAccessToken(userId);
        const cookieOptions = { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", maxAge: 5 * 60 * 60 * 1000 };
        response.cookie("accessToken", newAccessToken, cookieOptions);
        return response.json({ message: "Access token refreshed successfully.", error: false, success: true, data: { accessToken: newAccessToken } });
    } catch (error) {
        return response.status(500).json({ message: error.message || error, error: true, success: false });
    }
}

// get user details (protected route)
export async function userDetailsController(request, response) {
    try {
        const userId = request.userId;
        const user = await UserModel.findById(userId).select("-password -refreshToken -forgotPasswordOtp -otpExpireTime");
        if (!user) {
            return response.status(404).json({ message: "User not found.", error: true, success: false });
        }
        return response.json({ message: "User details fetched.", error: false, success: true, data: user });
    } catch (error) {
        return response.status(500).json({ message: error.message || error, error: true, success: false });
    }
}













































































































































































































































