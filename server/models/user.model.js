import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "provide name"],
    },
    email: {
        type: String,
        required: [true, "provide email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "provide password"],
    },
    avatar: {
        type: String,
        default: "",
    },
    mobile: {
        type: String,
        default: "",
    },
    refreshToken: {
        type: String,
        default: "",
    },
    verify_email: {
        type: Boolean,
        default: true,
    },
    isVerified: {
        type: Boolean,
        default: true,
    },
    last_login_date: {
        type: Date,
        default: null,
    },
    status: {
        type: String,
        default: "active",
    },
    address_details: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "address",
        },
    ],
    Shopping_cart: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "cartproduct",
        },
    ],
    orderHistory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "order",
        },
    ],
    forgotPasswordOtp: {
        type: String,
        default: null,
    },
    otpExpireTime: {
        type: Date,
        default: null,
    },
    role: {
        type: String,
        enum: ["ADMIN", "USER", "admin", "user"],
        default: "USER",
    },
}, { timestamps: true });

const UserModel = mongoose.model("User", userSchema);

export default UserModel;