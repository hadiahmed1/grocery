class ApiError extends Error {
    statusCode: any;
    data: null;
    success: boolean;
    errors: never[];

    constructor(statusCode = 400, message = "Something went wrong") {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.data = null;
        this.success = false;
    }
}

export default ApiError;