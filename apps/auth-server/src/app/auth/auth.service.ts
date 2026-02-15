import {
    AuthorizeQueryParams,
    GetTokenDto,
    hasAuthCodeGrant,
    isRedirectUrlValid,
    isRefreshTokenValid,
    LoginDto,
} from '@dnd-mapp/auth-domain';
import {
    AuthServerConfig,
    ConfigurationNamespaces,
    fromBase64,
    hashPassword,
    sha256,
    toBase64,
    verifyPassword,
} from '@dnd-mapp/backend-utils';
import { ForbiddenException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { nanoid } from 'nanoid';
import { ClientService } from '../client';
import { DmaJwtService } from '../jwt';
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
    private readonly dmaJwtService: DmaJwtService;
    private readonly logger = new Logger(AuthService.name);

    public constructor(
        configService: ConfigService<AuthServerConfig, true>,
        clientService: ClientService,
        userService: UserService,
        tokenService: TokenService,
        dmaJwtService: DmaJwtService,
        authTransactionRepository: AuthTransactionRepository,
    ) {
        this.configService = configService;
        this.clientService = clientService;
        this.userService = userService;
        this.tokenService = tokenService;
        this.dmaJwtService = dmaJwtService;
        this.authTransactionRepository = authTransactionRepository;
    }

    public async authorize(params: AuthorizeQueryParams) {
        const { clientId, redirectUrl } = params;

        const client = await this.clientService.getById(clientId);

        if (client === null) {
            this.logger.warn(`Authorization failed: Client "${clientId}" not found`);
            throw new ForbiddenException();
        }
        if (!isRedirectUrlValid(client.redirectUrls, redirectUrl)) {
            this.logger.warn(`Authorization failed: Invalid redirect URL "${redirectUrl}" for client "${clientId}"`);
            throw new ForbiddenException();
        }
        const { id } = await this.authTransactionRepository.create(params);
        this.logger.log(`Auth transaction created: "${id}" for client "${clientId}"`);
        return toBase64(id);
    }

    public async login(data: LoginDto) {
        const { username, password, loginChallenge } = data;
        const authTransactionId = fromBase64(loginChallenge);

        const { passwordPepper } = this.configService.get(ConfigurationNamespaces.SERVER);

        const authTransaction = await this.authTransactionRepository.findOneById(authTransactionId);
        const user = await this.userService.getByUsername(username);

        const passwordHash = user?.password ?? (await hashPassword(nanoid(), passwordPepper));
        const passwordMatch = await verifyPassword(password, passwordHash, passwordPepper);

        if (authTransaction === null) {
            this.logger.warn(`Login failed: Invalid login challenge "${authTransactionId}"`);
            throw new UnauthorizedException();
        }
        if (user === null || !passwordMatch) {
            this.logger.warn(
                `Login failed: Invalid credentials for user "${username}" in transaction "${authTransactionId}"`,
            );
            throw new UnauthorizedException('Invalid username/password');
        }
        authTransaction.authCode = nanoid();
        authTransaction.authCodeExpiry = new Date(Date.now() + AUTH_CODE_EXPIRY);
        authTransaction.user = user;

        await this.authTransactionRepository.update(authTransaction);
        this.logger.log(`Login successful: User "${user.id}" assigned authCode for transaction "${authTransactionId}"`);

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
                !authTransaction.user ||
                !authTransaction.authCodeExpiry ||
                !authTransaction.authCode
            ) {
                this.logger.warn(`Token exchange failed: No transaction found for authCode.`);
                throw new UnauthorizedException();
            }
            if (codeChallenge !== authTransaction.codeChallenge) {
                this.logger.warn(
                    `Token exchange failed: PKCE code verifier mismatch for transaction "${authTransaction.id}"`,
                );
                throw new UnauthorizedException();
            }
            if (authTransaction.authCodeExpiry.getTime() < now.getTime()) {
                this.logger.warn(
                    `Token exchange failed: PKCE code verifier mismatch for transaction "${authTransaction.id}"`,
                );
                throw new UnauthorizedException();
            }
            const refreshToken = await this.tokenService.createRefreshToken({ userId: authTransaction.user.id });
            const accessToken = await this.dmaJwtService.createAccessToken({ userId: authTransaction.user.id });
            const idToken = await this.dmaJwtService.createIDToken({
                user: authTransaction.user,
                nonce: authTransaction.nonce,
            });

            await this.authTransactionRepository.removeById(authTransaction.id);
            this.logger.log(`Tokens issued via authCode for user "${authTransaction.user.id}"`);

            return {
                refreshToken: refreshToken,
                accessToken: accessToken,
                idToken: idToken,
            };
        }
        const currentRefreshToken = await this.tokenService.getByHash(data.plainToken);

        if (
            currentRefreshToken === null ||
            !isRefreshTokenValid(sha256(data.plainToken), currentRefreshToken.tokenHash)
        ) {
            this.logger.warn(`Refresh failed: Invalid or non-existent refresh token hash.`);
            throw new UnauthorizedException();
        }
        this.logger.log(`Refreshing tokens for user "${currentRefreshToken.user.id}"`);

        await this.tokenService.revokeRefreshToken(currentRefreshToken.id);

        const refreshToken = await this.tokenService.createRefreshToken({
            userId: currentRefreshToken.user.id,
            familyId: currentRefreshToken.familyId,
        });
        const accessToken = await this.dmaJwtService.createAccessToken({ userId: currentRefreshToken.user.id });
        const idToken = await this.dmaJwtService.createIDToken({
            user: currentRefreshToken.user,
        });

        return {
            refreshToken: refreshToken,
            accessToken: accessToken,
            idToken: idToken,
        };
    }
}
