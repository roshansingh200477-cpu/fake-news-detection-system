import jwt from "jsonwebtoken";
import User from '../modules/auth/auth.model.js';

const authMiddleware = async (req, res, next)=>{
    try{
        // Get token and validate Header 
        const authHeader = req.headers.authorization; 

        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({
                success: false,
                message: "Access denied. Please provide the Bearer token.",
            });
        }
        const token = authHeader.split(" ")[1];

        // Verify the Token 
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Fetch the user in DB 
        // lean() it makes query faster by returning the plain js instead of mongoose documents
        const user = await User.findById(decoded.id).select("-password").lean();

        if(!user){
            return res.status(401).json({
                success: false,
                message: "The user belong to this token is no longer exists",
            });
        }
        // attach user to request 
        req.user = user;
        // continue
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

export default authMiddleware;