import { UserDto } from '@dnd-mapp/auth-domain';
import { sha256 } from '@dnd-mapp/backend-utils';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { nanoid } from 'nanoid';
import { TokenRepository } from './token.repository';

interface CreateRefreshTokenParams {
    userId: string;
}

interface CreateAccessTokenParams {
    userId: string;
}

interface CreateIDTokenParams {
    nonce: string;
    user: UserDto;
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

    public constructor(jwtService: JwtService, tokenRepository: TokenRepository) {
        this.tokenRepository = tokenRepository;
        this.jwtService = jwtService;
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

    public async createAccessToken(params: CreateAccessTokenParams) {
        return await this.jwtService.signAsync(
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
        );
    }

    public async createIDToken(params: CreateIDTokenParams) {
        return await this.jwtService.signAsync(
            {
                nonce: params.nonce,
                username: params.user.username,
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
        );
    }
}
