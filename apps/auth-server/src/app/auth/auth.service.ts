import {
    AuthorizeQueryParams,
    GetTokenDto,
    hasAuthCodeGrant,
    isRedirectUrlValid,
    LoginDto,
} from '@dnd-mapp/auth-domain';
import {
    AuthServerConfig,
    ConfigurationNamespaces,
    fromBase64,
    sha256,
    toBase64,
    verifyPassword,
} from '@dnd-mapp/backend-utils';
import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { nanoid } from 'nanoid';
import { ClientService } from '../client';
import { TokenService } from '../token';
import { UserService } from '../user';
import { AuthTransactionRepository } from './auth-transaction.repository';

// 10 minutes
const AUTH_CODE_EXPIRY = 600_000;

@Injectable()
export class AuthService {
    private readonly configService: ConfigService<AuthServerConfig, true>;
    private readonly clientService: ClientService;
    private readonly userService: UserService;
    private readonly tokenService: TokenService;
    private readonly authTransactionRepository: AuthTransactionRepository;

    public constructor(
        configService: ConfigService<AuthServerConfig, true>,
        clientService: ClientService,
        userService: UserService,
        tokenService: TokenService,
        authTransactionRepository: AuthTransactionRepository,
    ) {
        this.configService = configService;
        this.clientService = clientService;
        this.userService = userService;
        this.tokenService = tokenService;
        this.authTransactionRepository = authTransactionRepository;
    }

    public async authorize(params: AuthorizeQueryParams) {
        const { clientId, redirectUrl } = params;

        const client = await this.clientService.getById(clientId);

        if (client === null || !isRedirectUrlValid(client.redirectUrls, redirectUrl)) {
            throw new ForbiddenException();
        }
        const { id } = await this.authTransactionRepository.create(params);
        return toBase64(id);
    }

    public async login(data: LoginDto) {
        const { username, password, loginChallenge } = data;
        const authTransactionId = fromBase64(loginChallenge);

        const { passwordPepper } = this.configService.get(ConfigurationNamespaces.SERVER);

        const authTransaction = await this.authTransactionRepository.findOneById(authTransactionId);
        const user = await this.userService.getByUsername(username);

        const passwordMatch = await verifyPassword(password, user?.password ?? nanoid(), passwordPepper);
        if (authTransaction === null || user === null || !passwordMatch) throw new UnauthorizedException();

        authTransaction.authCode = nanoid();
        authTransaction.authCodeExpiry = new Date(Date.now() + AUTH_CODE_EXPIRY);
        authTransaction.user = user;

        await this.authTransactionRepository.update(authTransaction);

        return {
            authCode: authTransaction.authCode,
            state: authTransaction.state,
            redirectUrl: authTransaction.redirectUrl,
        };
    }

    public async token(data: GetTokenDto) {
        if (hasAuthCodeGrant(data)) {
            const { authCode, clientId, codeVerifier } = data;

            const authTransaction = await this.authTransactionRepository.findOneByAuthCodeAndClientId(
                authCode,
                clientId,
            );
            const codeChallenge = sha256(codeVerifier);
            const now = new Date();

            if (
                !authTransaction ||
                !authTransaction.authCodeExpiry ||
                !authTransaction.user ||
                codeChallenge !== authTransaction.codeChallenge ||
                authTransaction.authCodeExpiry.getTime() < now.getTime()
            ) {
                throw new UnauthorizedException();
            }
            const refreshToken = await this.tokenService.createRefreshToken({ userId: authTransaction.user?.id });

            // TODO - Generate Access (JWT) and ID (JWT) tokens

            await this.authTransactionRepository.removeById(authTransaction.id);
            return {
                refreshToken: refreshToken,
            };
        }
        // TODO - Generate new tokens using refresh token.
        return {};
    }
}
