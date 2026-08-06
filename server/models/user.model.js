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
    avatar: {
        type: String,
        default: "",
    },
    mobile: {
        type: Number,
        default: null,
    },
    reference_token: {
        type: String,
        default: "",
    },
    verify_email: {
        type: Boolean,
        default: false,
    },
    last_login_date: {
        type: Date,
        default: null,
    },
    status: {
        type: String,
        enum: ["ACTIVE", "INACTIVE", "SUSPENDED"],
        default: "ACTIVE",
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
            ref: "cartProduct",
        },
    ],
    orderHistory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "order",
        },
    ],
    forgot_password_otp: {
        type: String,
        default: null,
    },
    forgot_password_expiry: {
        type: Date,
        default: null,
    },
    role: {
        type: String,
        enum: ["ADMIN", "USER"],
        default: "USER",
    },
}, { timestamps: true });

const UserModel = mongoose.model("User", userSchema);

export default UserModel;