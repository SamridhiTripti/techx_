import jwt from 'jsonwebtoken';

const auth = (request, response, next) => {
    try {
        const token = request.cookies?.accessToken || request.headers['authorization']?.split(' ')[1];

        if (!token) {
            return response.status(401).json({ message: 'Access denied. No token provided.' });
        }

        const secret = process.env.SECRET_KEY_ACCESS_TOKEN || process.env.JWT_SECRET || "techx_secret_key_2026";
        const decode = jwt.verify(token, secret);

        if (!decode) {
            return response.status(401).json({ message: 'Unauthorized access', error: true, success: false });
        }

        request.userId = decode.id || decode.userId || decode._id;
        next();
    } catch (error) {
        return response.status(401).json({ message: error.message || 'Unauthorized or expired token', error: true, success: false });
    }
};

export default auth;