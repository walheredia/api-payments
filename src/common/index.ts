enum Status {
    success = 'success',
    error = 'error'
};

interface ISuccessResponse {
    data: any,
    message?: string, 
};

interface IErrorResponse {
    message: string,
};

type ResposeType = ISuccessResponse | IErrorResponse;

interface IApiResponse {
    status: Status,
    response: ResposeType
}

interface SuccessResponse extends IApiResponse{
    status: Status.success,
    response: ISuccessResponse
};

interface ErrorResponse extends IApiResponse {
    status: Status.error,
    response: IErrorResponse
};

class ApiResponse {
    static successResponse(response: ISuccessResponse): SuccessResponse {
        return {
            status: Status.success,
            response,
        }
    }

    static errorResponse(response: IErrorResponse): ErrorResponse {
        return {
            status: Status.error,
            response
        }
    }
}

export default ApiResponse;
