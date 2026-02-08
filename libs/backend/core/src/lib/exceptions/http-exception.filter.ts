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
            const { statusCode, message, error } = exceptionBody as HttpExceptionBody;

            response.status(statusCode).send({
                status: statusCode,
                error: error,
                timestamp: new Date(),
                message: message,
            });
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
