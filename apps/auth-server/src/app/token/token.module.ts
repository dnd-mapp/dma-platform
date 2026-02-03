import { AuthServerConfig, ConfigurationNamespaces, ServerConfig } from '@dnd-mapp/backend-utils';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { readFile } from 'fs/promises';
import { TokenBlacklistRepository } from './token-blacklist.repository';
import { TokenBlacklistService } from './token-blacklist.service';
import { TokenRepository } from './token.repository';
import { TokenService } from './token.service';

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService<AuthServerConfig, true>) => {
                const { jwt } = configService.get<ServerConfig>(ConfigurationNamespaces.SERVER);

                const publicKey = await readFile(jwt.publicKeyPath, { encoding: 'utf8' });
                const privateKey = await readFile(jwt.privateKeyPath, { encoding: 'utf8' });

                return {
                    publicKey: publicKey,
                    privateKey: privateKey,
                };
            },
        }),
    ],
    providers: [TokenService, TokenBlacklistService, TokenRepository, TokenBlacklistRepository],
    exports: [TokenService],
})
export class TokenModule {}
