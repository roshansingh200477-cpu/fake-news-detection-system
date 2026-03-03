import { validationResult } from "express-validator";

// Validation Error handler 
export const handleValidationErrors = (req, res, next)=>{
    const error = validationResult(req);

    if(!error.isEmpty()){
        res.status(400).json({
            success: false,
            error: error.array(),
        });
    }
    next();
};

// Global Error handler

const errorMiddleware = (err, req, res, next)=>{
    // Default Error 
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Sever Error";

    // Showing Error for Mongoose duplicates keys
    if(err.code === 11000){
        statusCode = 400;
        message = "Duplicate Field value entered";
    }

    // Handle JWT error
    if(err.name === "jsonWebTokenError"){
        statusCode = 401;
        message = "Invalid Token";
    }

    // Handle JWT Expired error
    if(err.name === "TokenExpiredError"){
        statusCode = 401;
        message = "Token Expired";
    }

    res.status(statusCode).json({
        success: false,
        message,
    });
};

export default errorMiddleware;