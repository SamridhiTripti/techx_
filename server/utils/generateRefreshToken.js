import UserModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

const generateRefreshToken = async (userId) => {
    const token = jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET_KEY_REFRESH_TOKEN, { expiresIn: "7d" });
    await UserModel.updateOne({ _id: userId }, { refreshToken: token });
    return token;
};

export default generateRefreshToken;