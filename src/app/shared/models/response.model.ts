export interface Response<T> {
    success: boolean
    body: T;
    message: string;
    httpStatusCode: number;
}
