import { UserDto } from '@dnd-mapp/auth-domain';
import { sha256 } from '@dnd-mapp/backend-utils';
import { tryCatch } from '@dnd-mapp/shared-utils';
import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { nanoid } from 'nanoid';
import { TokenRepository } from './token.repository';

interface CreateRefreshTokenParams {
    userId: string;
    familyId?: string;
}

interface CreateAccessTokenParams {
    userId: string;
}

interface CreateIDTokenParams {
    user: UserDto;
    nonce?: string;
}

/** Refresh token expiration time in ms. Valid for 31 days. */
const REFRESH_TOKEN_EXPIRATION_TIME = 2_678_400_000;

/** Access token expiration time in seconds. Valid for 5 minutes. */
const ACCESS_TOKEN_EXPIRATION_TIME = 300;

/** ID token expiration time in seconds. Valid for 5 minutes. */
const ID_TOKEN_EXPIRATION_TIME = 300;

@Injectable()
export class TokenService {
    private readonly jwtService: JwtService;
    private readonly tokenRepository: TokenRepository;
    private readonly logger = new Logger(TokenService.name);

    public constructor(jwtService: JwtService, tokenRepository: TokenRepository) {
        this.tokenRepository = tokenRepository;
        this.jwtService = jwtService;
    }

    public async getByHash(plainToken: string) {
        const tokenHash = sha256(plainToken);
        const refreshToken = await this.tokenRepository.findOneByTokenHash(tokenHash);

        if (!refreshToken) {
            this.logger.debug(`Token lookup failed for hash starting with: "${tokenHash.substring(0, 8)}..."`);
        }
        return refreshToken;
    }

    public async createRefreshToken(params: CreateRefreshTokenParams) {
        const expiresAt = new Date(Date.now() + REFRESH_TOKEN_EXPIRATION_TIME);
        const token = nanoid();

        const refreshToken = await this.tokenRepository.create({
            userId: params.userId,
            expiresAt: expiresAt,
            tokenHash: sha256(token),
            ...(params.familyId ? { familyId: params.familyId } : {}),
        });

        this.logger.log(
            `Refresh token created for user "${params.userId}". Family: "${params.familyId ?? refreshToken.familyId}"`,
        );
        return {
            ...refreshToken,
            plainToken: token,
        };
    }

    public async createAccessToken(params: CreateAccessTokenParams) {
        this.logger.debug(`Signing Access Token for subject: "${params.userId}"`);

        const { data, error } = await tryCatch(
            this.jwtService.signAsync(
                {},
                {
                    algorithm: 'ES512',
                    allowInsecureKeySizes: false,
                    allowInvalidAsymmetricKeyTypes: false,
                    audience: ['https://localhost.auth.dndmapp.dev:4350'],
                    expiresIn: ACCESS_TOKEN_EXPIRATION_TIME,
                    issuer: 'https://localhost.auth.dndmapp.dev:4350',
                    notBefore: 0,
                    jwtid: nanoid(),
                    subject: params.userId,
                },
            ),
        );

        if (error) {
            this.logger.error(`Failed to sign Access Token for user "${params.userId}"`, error.stack);
            throw error;
        }
        return data;
    }

    public async createIDToken(params: CreateIDTokenParams) {
        this.logger.debug(`Signing ID Token for subject: "${params.user.id}"`);

        const { data, error } = await tryCatch(
            this.jwtService.signAsync(
                {
                    username: params.user.username,
                    ...(params.nonce ? { nonce: params.nonce } : {}),
                },
                {
                    algorithm: 'ES512',
                    allowInsecureKeySizes: false,
                    allowInvalidAsymmetricKeyTypes: false,
                    audience: ['https://localhost.auth.dndmapp.dev:4350'],
                    expiresIn: ID_TOKEN_EXPIRATION_TIME,
                    issuer: 'https://localhost.auth.dndmapp.dev:4350',
                    notBefore: 0,
                    jwtid: nanoid(),
                    subject: params.user.id,
                },
            ),
        );

        if (error) {
            this.logger.error(`Failed to sign ID Token for user "${params.user.id}"`, error.stack);
            throw error;
        }
        return data;
    }

    public async revokeRefreshToken(tokenId: string) {
        this.logger.log(`Revoking refresh token: "${tokenId}"`);
        return await this.tokenRepository.revokeOneById(tokenId);
    }
}
