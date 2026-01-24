import { AuthorizeQueryParams, isRedirectUrlValid, LoginDto } from '@dnd-mapp/auth-domain';
import {
    AuthServerConfig,
    ConfigurationNamespaces,
    fromBase64,
    toBase64,
    verifyPassword,
} from '@dnd-mapp/backend-utils';
import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { nanoid } from 'nanoid';
import { ClientService } from '../client';
import { UserService } from '../user';
import { AuthTransactionRepository } from './auth-transaction.repository';

// 10 minutes
const AUTH_CODE_EXPIRY = 600_000;

@Injectable()
export class AuthService {
    private readonly authTransactionRepository: AuthTransactionRepository;
    private readonly clientService: ClientService;
    private readonly userService: UserService;
    private readonly configService: ConfigService<AuthServerConfig, true>;

    public constructor(
        authTransactionRepository: AuthTransactionRepository,
        clientService: ClientService,
        userService: UserService,
        configService: ConfigService<AuthServerConfig, true>,
    ) {
        this.authTransactionRepository = authTransactionRepository;
        this.clientService = clientService;
        this.userService = userService;
        this.configService = configService;
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

        await this.authTransactionRepository.update(authTransaction);

        return {
            authCode: authTransaction.authCode,
            state: authTransaction.state,
            redirectUrl: authTransaction.redirectUrl,
        };
    }
}
