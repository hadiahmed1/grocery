class ApiError extends Error {
    statusCode: number;
    data: null;
    success: boolean;
    errors: string[];

    constructor(statusCode = 400, message = "Something went wrong", errors:string[]=[]) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.data = null;
        this.success = false;
        this.errors= errors;
    }
}

export default ApiError;