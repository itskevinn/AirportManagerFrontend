export interface Response<T> {
    success: boolean
    data: T;
    message: string;
    httpStatusCode: number;
}
