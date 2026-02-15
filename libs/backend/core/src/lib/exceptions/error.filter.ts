import { isProduction } from '@dnd-mapp/backend-utils';
import { HttpStatusCodes, HttpStatusNames, ServerError } from '@dnd-mapp/shared-utils';
import { ArgumentsHost, Catch, ClassProvider, ExceptionFilter, Logger } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { FastifyReply } from 'fastify';

export function provideErrorFilter(): ClassProvider {
    return {
        provide: APP_FILTER,
        useClass: ErrorFilter,
    };
}

@Catch(Error)
export class ErrorFilter implements ExceptionFilter {
    public catch(error: Error, host: ArgumentsHost) {
        const context = host.switchToHttp();
        const response = context.getResponse<FastifyReply>();

        const status = HttpStatusCodes.INTERNAL_SERVER_ERROR;

        Logger.error(error.message, isProduction() ? undefined : error.stack, ErrorFilter.name);

        const serverError: ServerError = {
            status: status,
            error: HttpStatusNames[status],
            timestamp: new Date(),
            message: 'Something unexcepted happened...',
        };
        response.status(status).send(serverError);
    }
}
