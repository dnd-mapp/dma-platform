import {
    AuthorizeQueryParams,
    CookieNames,
    type GetTokenDto,
    hasAuthCodeGrant,
    LoginDto,
    LogoutDto,
    RedirectResponseDto,
} from '@dnd-mapp/auth-domain';
import { UnsignResult } from '@fastify/cookie';
import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Logger,
    Post,
    Query,
    Res,
    UnauthorizedException,
    UseGuards,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { Cookies } from '../core/decorators';
import { TokenBlacklistService, TokenService } from '../token';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
    private readonly authService: AuthService;
    private readonly tokenService: TokenService;
    private readonly tokenBlacklistService: TokenBlacklistService;
    private readonly logger = new Logger(AuthController.name);

    public constructor(
        authService: AuthService,
        tokenService: TokenService,
        tokenBlacklistService: TokenBlacklistService,
    ) {
        this.authService = authService;
        this.tokenService = tokenService;
        this.tokenBlacklistService = tokenBlacklistService;
    }

    @Get('/authorize')
    public async authorize(
        @Query() queryParams: AuthorizeQueryParams,
        @Res({ passthrough: true }) response: FastifyReply,
    ) {
        this.logger.log(`Authorization request initiated for client: "${queryParams.clientId}"`);
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
    public async token(
        @Body() data: GetTokenDto,
        @Res({ passthrough: true }) response: FastifyReply,
        @Cookies(CookieNames.REFRESH_TOKEN) refreshToken?: UnsignResult,
    ) {
        if (!hasAuthCodeGrant(data) && (!refreshToken || !refreshToken.valid)) {
            this.logger.warn(`Token request failed: Invalid or missing refresh token. Grant: "${data.grantType}"`);
            throw new UnauthorizedException();
        }
        if (!hasAuthCodeGrant(data) && refreshToken?.valid && refreshToken.value) {
            data.plainToken = refreshToken.value;
        }
        const tokens = await this.authService.token(data);
        const { plainToken, expiresAt } = tokens.refreshToken;

        this.logger.log(`Tokens issued successfully. Grant: "${data.grantType}"`);

        response.setCookie(CookieNames.REFRESH_TOKEN, plainToken, {
            maxAge: Math.round((expiresAt.getTime() - Date.now()) / 1_000),
            path: '/',
            sameSite: 'strict',
            // TODO - Compute domain dynamically
            secure: true,
            signed: true,
            httpOnly: true,
        });

        return {
            accessToken: tokens?.accessToken,
            idToken: tokens?.idToken,
        };
    }

    @UseGuards(AuthGuard)
    @Post('/logout')
    public async logout(
        @Body() data: LogoutDto,
        @Res({ passthrough: true }) response: FastifyReply,
        @Cookies(CookieNames.REFRESH_TOKEN) refreshToken?: UnsignResult,
    ) {
        if (data.accessToken) {
            await this.tokenBlacklistService.revoke(data.accessToken);
        }
        if (data.idToken) {
            await this.tokenBlacklistService.revoke(data.idToken);
        }
        if (refreshToken && refreshToken.valid) {
            const token = await this.tokenService.getByHash(refreshToken.value);

            if (token) {
                await this.tokenService.revokeRefreshToken(token.id);
            }
        }
        response.clearCookie(CookieNames.REFRESH_TOKEN, {
            secure: true,
            path: '/',
            signed: true,
            sameSite: 'strict',
            httpOnly: true,
        });
    }
}
