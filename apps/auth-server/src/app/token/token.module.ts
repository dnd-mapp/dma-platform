import { Module } from '@nestjs/common';
import { TokenRepository } from './token.repository';
import { TokenService } from './token.service';

@Module({
    imports: [],
    providers: [TokenService, TokenRepository],
    exports: [TokenService],
})
export class TokenModule {}
