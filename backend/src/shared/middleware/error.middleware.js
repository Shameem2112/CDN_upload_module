import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import logger from "../utils/logger.js";

const errorHandler = (err, req, res, next) => {
    logger.error({
        message: err.message,
        stack: err.stack,
        statusCode: err.statusCode || 500,
        method: req.method,
        url: req.originalUrl,
        ip: req.ip,
    });

    if (err.statusCode) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });
    }

    if (err instanceof jwt.TokenExpiredError) {
        return res.status(401).json({
            success: false,
            message: "Token has expired",
        });
    }

    if (err instanceof jwt.JsonWebTokenError) {
        return res.status(401).json({
            success: false,
            message: "Invalid token",
        });
    }

    if (err instanceof mongoose.Error.CastError) {
        return res.status(400).json({
            success: false,
            message: "Invalid resource id",
        });
    }

    if (err.code === 11000) {
        return res.status(409).json({
            success: false,
            message: "Duplicate value",
        });
    }

    if (err instanceof mongoose.Error.ValidationError) {
        return res.status(400).json({
            success: false,
            message: Object.values(err.errors)
                .map(error => error.message)
                .join(", "),
        });
    }

    return res.status(500).json({
        success: false,
        message: "Internal Server Error",
    });
};

export default errorHandler;