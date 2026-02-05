import { Injectable } from '@nestjs/common';
import { DmaJwtService } from '../jwt';
import { TokenBlacklistRepository } from './token-blacklist.repository';

@Injectable()
export class TokenBlacklistService {
    private readonly tokenBlacklistRepository: TokenBlacklistRepository;
    private readonly dmaJwtService: DmaJwtService;

    public constructor(tokenBlacklistRepository: TokenBlacklistRepository, dmaJwtService: DmaJwtService) {
        this.tokenBlacklistRepository = tokenBlacklistRepository;
        this.dmaJwtService = dmaJwtService;
    }

    public async revoke(token: string) {
        const { jti, exp } = this.dmaJwtService.verify(token);
        await this.tokenBlacklistRepository.create(jti, new Date(exp * 1_000));
    }
}
