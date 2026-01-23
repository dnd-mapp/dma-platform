import { AuthorizeQueryParams } from '@dnd-mapp/auth-domain';
import { Controller, Get, HttpStatus, Query, Res } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
    private readonly authService: AuthService;

    public constructor(authService: AuthService) {
        this.authService = authService;
    }

    @Get('/authorize')
    public async authorize(
        @Query() queryParams: AuthorizeQueryParams,
        @Res({ passthrough: true }) response: FastifyReply,
    ) {
        const loginChallenge = await this.authService.authorize(queryParams);

        response.status(HttpStatus.FOUND).headers({
            location: `https://localhost.auth.dndmapp.dev:4300/log-in?loginChallenge=${loginChallenge}`,
        });
    }
}
