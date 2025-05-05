class ApiResponse {
    statusCode: number;
    success: boolean;
    message: string;
    data: any;
    constructor(message = "success", data, statusCode = 200) {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = true;
    }
}

export default ApiResponse;