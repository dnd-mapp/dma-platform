import { HttpStatusCode, HttpStatusName } from './http-status';

export interface ServerError {
    status: HttpStatusCode;
    error: HttpStatusName;
    timestamp: Date;
    message: string;
}
