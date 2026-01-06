import { HttpException } from '@nestjs/common';

export const PRECONDITION_REQUIRED_ERROR = 'Precondition Required' as const;
export const PRECONDITION_REQUIRED_STATUS = 428 as const;

export class PreconditionRequiredException extends HttpException {
    constructor(message: string) {
        super(
            {
                message: message,
                error: PRECONDITION_REQUIRED_ERROR,
                statusCode: PRECONDITION_REQUIRED_STATUS,
            },
            PRECONDITION_REQUIRED_STATUS,
        );
    }
}
