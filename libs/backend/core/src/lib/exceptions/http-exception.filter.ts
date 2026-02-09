import { httpStatusCode, HttpStatusNames, ServerError } from '@dnd-mapp/shared-utils';
import { ArgumentsHost, Catch, ClassProvider, ExceptionFilter, HttpException } from '@nestjs/common';
import { HttpExceptionBody } from '@nestjs/common/interfaces/http/http-exception-body.interface';
import { APP_FILTER } from '@nestjs/core';
import { FastifyReply } from 'fastify';

export function provideHttpExceptionFilter(): ClassProvider {
    return {
        provide: APP_FILTER,
        useClass: HttpExceptionFilter,
    };
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    public catch(exception: HttpException, host: ArgumentsHost) {
        const context = host.switchToHttp();

        const response = context.getResponse<FastifyReply>();
        const exceptionBody = exception.getResponse();

        if (typeof exceptionBody !== 'string') {
            const { statusCode, message } = exceptionBody as HttpExceptionBody;
            const status = httpStatusCode(statusCode);

            const serverError: ServerError = {
                status: status,
                error: HttpStatusNames[status],
                timestamp: new Date(),
                message: message as string,
            };

            response.status(statusCode).send(serverError);
        } else {
            const status = exception.getStatus();

            // TODO: Remove once figured out what the body contains
            console.log({ exception });

            response.status(status).send({
                status: status,
                timestamp: new Date(),
            });
        }
    }
}
