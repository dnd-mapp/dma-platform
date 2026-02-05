import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { FastifyRequest } from 'fastify';

export const Cookies = createParamDecorator((cookieName: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const cookies = request.cookies;

    if (Object.keys(cookies).length === 0) return undefined;
    if (cookieName && cookies[cookieName]) return request.unsignCookie(cookies[cookieName]);
    return cookies;
});
