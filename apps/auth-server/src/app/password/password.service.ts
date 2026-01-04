import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import argon2 from 'argon2';
import { SERVER_CONFIGURATION_NAMESPACE, ServerConfiguration } from '../config';

@Injectable()
export class PasswordService implements OnModuleInit {
    private readonly configService: ConfigService;

    private pepper: string;

    public constructor(configService: ConfigService) {
        this.configService = configService;
    }

    public async onModuleInit() {
        await ConfigModule.envVariablesLoaded;

        const { pepper } = this.configService.get<ServerConfiguration>(SERVER_CONFIGURATION_NAMESPACE);
        this.pepper = pepper;
    }

    public async hashPassword(password: string) {
        return await argon2.hash(password, { type: argon2.argon2i, secret: Buffer.from(this.pepper), timeCost: 8 });
    }

    public async verifyPasswordHash(password: string, hash: string) {
        return await argon2.verify(hash, password, { secret: Buffer.from(this.pepper) });
    }
}
