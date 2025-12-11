import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config(); // Load variables from .env

/*
    authMiddleware.js
    -----------------
    Protects routes by verifying a JWT token.
    If valid, attaches req.user.id for use in controllers.
    Prevents unauthorized access to protected endpoints.
*/ 

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "No token provided" });
    }

    // Accept "Bearer <token>" or just "<token>"
    const token = authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : authHeader;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Store user ID on request object, remember mongodb has it as "_id"
        req.user = { id: decoded.id }; 

        next(); //can move on now
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
}

export default authMiddleware;
