class ApiError extends Error {
    statusCode: number;
    data: null;
    success: boolean;
    errors: never[];

    constructor(statusCode = 400, message = "Something went wrong", errors=[]) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.data = null;
        this.success = false;
        this.errors= errors;
    }
}

export default ApiError;