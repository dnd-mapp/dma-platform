import {
    AuthorizeQueryParams,
    CookieNames,
    type GetTokenDto,
    LoginDto,
    RedirectResponseDto,
} from '@dnd-mapp/auth-domain';
import { Body, Controller, Get, HttpStatus, Post, Query, Res } from '@nestjs/common';
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

        // TODO - Use configuration to determine route of auth-client
        const url = new URL('https://localhost.auth.dndmapp.dev:4300/log-in');
        url.searchParams.set('loginChallenge', loginChallenge);

        response.status(HttpStatus.FOUND).headers({
            location: url.toString(),
        });
    }

    @Post('/login')
    public async login(@Body() data: LoginDto) {
        const { redirectUrl, state, authCode } = await this.authService.login(data);

        const url = new URL(redirectUrl);
        url.searchParams.set('state', state);
        url.searchParams.set('authCode', authCode);

        return new RedirectResponseDto(url.toString());
    }

    @Post('/token')
    public async token(@Body() data: GetTokenDto, @Res({ passthrough: true }) response: FastifyReply) {
        const tokens = await this.authService.token(data);

        if (tokens?.refreshToken?.plainToken) {
            const { plainToken, expiresAt } = tokens.refreshToken;

            response.setCookie(CookieNames.REFRESH_TOKEN, plainToken, {
                maxAge: Math.round((expiresAt.getTime() - Date.now()) / 1000),
                path: '/',
                sameSite: 'strict',
                secure: true,
                signed: true,
                httpOnly: true,
            });
        }
    }
}
