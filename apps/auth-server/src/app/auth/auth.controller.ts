import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { FastifyReply } from 'fastify';

@Controller()
export class AuthController {
    @Get('/authorize')
    public authorize(@Res({ passthrough: true }) response: FastifyReply) {
        response.status(HttpStatus.FOUND).headers({
            location: 'https://localhost.auth.dndmapp.dev:4300/log-in',
        });
    }
}
