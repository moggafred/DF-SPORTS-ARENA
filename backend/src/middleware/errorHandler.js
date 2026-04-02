const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);

    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';

    if (err.name === 'CastError') {
        statusCode = 400;
        message = 'Invalid ID format';
    }

    if (err.code === 11000) {
        statusCode = 400;
        const field = Object.keys(err.keyValue)[0];
        message = `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
    }

    if (err.name === 'ValidationError') {
        statusCode = 400;
        const messages = Object.values(err.errors).map(e => e.message);
        message = messages.join(', ');
    }

    if (err.name === 'JsonWebTokenError') {
        statusCode = 401;
        message = 'Invalid token';
    }

    if (err.name === 'TokenExpiredError') {
        statusCode = 401;
        message = 'Token has expired';
    }

    res.status(statusCode).json({
        success: false,
        message,
        ...(process.env.NODE_ENV === 'development' && {
            stack: err.stack,
            error: err
        })
    });
};

const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = { errorHandler, notFound, AppError };
