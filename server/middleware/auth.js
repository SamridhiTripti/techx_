import jwt from 'jsonwebtoken';

const auth = (request, response, next) => {
    try {
        const token = request.cookies?.accessToken || request.headers['authorization']?.split(' ')[1];

        if (!token) {
            return response.status(401).json({ message: 'Access denied. No token provided.' });
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);

        if (!decode) {
            return response.status(401).json({ message: 'Unauthorized access', error: true, success: false });
        }

        request.userId = decode.id || decode.userId || decode._id;
        next();
    } catch (error) {
        response.status(500).json({ message: error.message || error, error: true, success: false });
    }
};

export default auth;