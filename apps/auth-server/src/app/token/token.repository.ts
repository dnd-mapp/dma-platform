import { CreateRefreshTokenDto, fromRawRefreshTokenToDto, selectRefreshTokenProperties } from '@dnd-mapp/auth-domain';
import { PrismaClient } from '@dnd-mapp/auth-server/prisma/client';
import { DatabaseService } from '@dnd-mapp/backend-core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TokenRepository {
    private readonly databaseService: DatabaseService<PrismaClient>;

    public constructor(databaseService: DatabaseService<PrismaClient>) {
        this.databaseService = databaseService;
    }

    public async findOneByTokenHash(tokenHash: string) {
        const result = await this.databaseService.prisma.refreshToken.findFirst({
            select: selectRefreshTokenProperties,
            where: { tokenHash: tokenHash },
        });

        if (!result) return null;
        return fromRawRefreshTokenToDto(result);
    }

    public async create(data: CreateRefreshTokenDto) {
        const { familyId, userId, tokenHash, expiresAt } = data;

        const result = await this.databaseService.prisma.refreshToken.create({
            select: selectRefreshTokenProperties,
            data: {
                familyId: familyId,
                userId: userId,
                tokenHash: tokenHash,
                expiresAt: expiresAt,
            },
        });

        return fromRawRefreshTokenToDto(result);
    }

    public async revokeOneById(tokenId: string) {
        const result = await this.databaseService.prisma.refreshToken.update({
            select: selectRefreshTokenProperties,
            where: { id: tokenId },
            data: {
                revoked: true,
            },
        });

        return fromRawRefreshTokenToDto(result);
    }
}
