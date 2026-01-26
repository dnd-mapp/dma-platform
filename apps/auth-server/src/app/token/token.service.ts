import { sha256 } from '@dnd-mapp/backend-utils';
import { Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { TokenRepository } from './token.repository';

interface CreateRefreshTokenParams {
    userId: string;
}

/** Refresh token expiration time in ms. Valid for 31 days. */
const REFRESH_TOKEN_EXPIRATION_TIME = 2_678_400_000;

@Injectable()
export class TokenService {
    private readonly tokenRepository: TokenRepository;

    public constructor(tokenRepository: TokenRepository) {
        this.tokenRepository = tokenRepository;
    }

    public async createRefreshToken(params: CreateRefreshTokenParams) {
        const expiresAt = new Date(Date.now() + REFRESH_TOKEN_EXPIRATION_TIME);
        const token = nanoid();

        return {
            ...(await this.tokenRepository.create({
                userId: params.userId,
                expiresAt: expiresAt,
                tokenHash: sha256(token),
            })),
            plainToken: token,
        };
    }
}
