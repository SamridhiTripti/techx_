import UserModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

const generateRefreshToken = async (userId) => {
    const secret = process.env.SECRET_KEY_REFRESH_TOKEN || process.env.JWT_REFRESH_SECRET || "techx_refresh_secret_key_2026";
    const token = jwt.sign({ id: userId }, secret, { expiresIn: "7d" });
    await UserModel.updateOne({ _id: userId }, { refreshToken: token });
    return token;
};

export default generateRefreshToken;