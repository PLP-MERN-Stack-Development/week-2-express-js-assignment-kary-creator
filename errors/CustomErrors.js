class CustomError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

class NotFoundError extends CustomError {
    constructor(message = 'Resource not found') {
        super(message);
        this.statusCode = 404;
    }
}

class ValidationError extends CustomError {
    constructor(message = 'Validation error') {
        super(message);
        this.statusCode = 400;
    }
}

module.exports = {
    NotFoundError,
    ValidationError,
};