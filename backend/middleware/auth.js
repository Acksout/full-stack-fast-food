import jwt from 'jsonwebtoken';

// Authentication middleware
const authMiddleware = async (req, res, next) => {
    const {token} = req.headers;

    // Check if authentication token is provided
    if (!token) {
        return res.status(401).json({success: false, message: 'No authentication token provided'});
    }

    try {
        // Verify the JWT token
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user ID to the request body
        req.body.userId = token_decode.id;

        // Call the next middleware or route handler
        next();
    } catch (error) {
        // Return error message if token verification fails
        return res.status(401).json({success: false, message: error.message});
    }
}

export default authMiddleware;
