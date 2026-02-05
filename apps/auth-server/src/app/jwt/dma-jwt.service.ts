import { UserDto } from '@dnd-mapp/auth-domain';
import { tryCatch } from '@dnd-mapp/shared-utils';
import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { nanoid } from 'nanoid';

interface CreateAccessTokenParams {
    userId: string;
}

interface CreateIDTokenParams {
    user: UserDto;
    nonce?: string;
}

interface AccessTokenPayload {
    iat: number;
    nbf: number;
    exp: number;
    aud: string[];
    iss: string;
    sub: string;
    jti: string;
}

/** Access token expiration time in seconds. Valid for 5 minutes. */
const ACCESS_TOKEN_EXPIRATION_TIME = 300;

/** ID token expiration time in seconds. Valid for 5 minutes. */
const ID_TOKEN_EXPIRATION_TIME = 300;

@Injectable()
export class DmaJwtService {
    private readonly jwtService: JwtService;
    private readonly logger = new Logger(DmaJwtService.name);

    public constructor(jwtService: JwtService) {
        this.jwtService = jwtService;
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

    public verify(token: string) {
        return this.jwtService.verify<AccessTokenPayload>(token, {
            algorithms: ['ES512'],
            issuer: 'https://localhost.auth.dndmapp.dev:4350',
            audience: ['https://localhost.auth.dndmapp.dev:4350'],
            ignoreNotBefore: false,
            ignoreExpiration: false,
        });
    }
}
