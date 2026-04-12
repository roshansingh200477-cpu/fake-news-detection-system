import jwt from "jsonwebtoken";
import User from '../modules/auth/auth.model.js';

const authMiddleware = async (req, res, next)=>{
    try{
        const authHeader = req.headers.authorization; 

        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({
                success: false,
                message: "Access denied. Please provide the Bearer token.",
            });
        }
        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id).select("-password").lean();

        if(!user){
            return res.status(401).json({
                success: false,
                message: "The user belong to this token is no longer exists",
            });
        }
        req.user = user;
        next();
    } catch(error){
        console.log("JWT ERROR TYPE:", error.name);
        console.log("JWT ERROR MESSAGE:", error.message);
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token.",
        });
    }
};

export const optionalAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            req.user = null;
            return next();
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password").lean();
        req.user = user || null;
        next();

    } catch (error) {
        req.user = null;
        next();
    }
};

export default authMiddleware;