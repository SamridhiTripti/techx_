import jwt from "jsonwebtoken";

const generateAccessToken = async (userId) => {
    const secret = process.env.SECRET_KEY_ACCESS_TOKEN || process.env.JWT_SECRET || "techx_secret_key_2026";
    const token = jwt.sign({ id: userId }, secret, { expiresIn: "5h" });
    return token;
};

export default generateAccessToken;