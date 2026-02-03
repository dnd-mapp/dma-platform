import { Injectable } from '@nestjs/common';
import { TokenBlacklistRepository } from './token-blacklist.repository';

@Injectable()
export class TokenBlacklistService {
    private readonly tokenBlacklistRepository: TokenBlacklistRepository;

    public constructor(tokenBlacklistRepository: TokenBlacklistRepository) {
        this.tokenBlacklistRepository = tokenBlacklistRepository;
    }

    public async revoke(jti: string) {
        await this.tokenBlacklistRepository.create(jti);
    }
}
