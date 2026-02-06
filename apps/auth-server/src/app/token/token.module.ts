import { Module } from '@nestjs/common';
import { DmaJwtModule } from '../jwt';
import { TokenBlacklistRepository } from './token-blacklist.repository';
import { TokenBlacklistService } from './token-blacklist.service';
import { TokenRepository } from './token.repository';
import { TokenService } from './token.service';

@Module({
    imports: [DmaJwtModule],
    providers: [TokenService, TokenBlacklistService, TokenRepository, TokenBlacklistRepository],
    exports: [TokenService, TokenBlacklistService],
})
export class TokenModule {}
