import { sha256 } from '@dnd-mapp/backend-utils';
import { Injectable, Logger } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { TokenRepository } from './token.repository';

interface CreateRefreshTokenParams {
    userId: string;
    familyId?: string;
}

/** Refresh token expiration time in ms. Valid for 31 days. */
const REFRESH_TOKEN_EXPIRATION_TIME = 2_678_400_000;

@Injectable()
export class TokenService {
    private readonly tokenRepository: TokenRepository;
    private readonly logger = new Logger(TokenService.name);

    public constructor(tokenRepository: TokenRepository) {
        this.tokenRepository = tokenRepository;
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

    public async revokeRefreshToken(tokenId: string) {
        this.logger.log(`Revoking refresh token: "${tokenId}"`);
        return await this.tokenRepository.revokeOneById(tokenId);
    }
}
