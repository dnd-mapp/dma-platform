import { PrismaClient } from '@dnd-mapp/auth-server/prisma/client';
import { DatabaseService } from '@dnd-mapp/backend-core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TokenBlacklistRepository {
    private readonly databaseService: DatabaseService<PrismaClient>;

    public constructor(databaseService: DatabaseService<PrismaClient>) {
        this.databaseService = databaseService;
    }

    public async create(jti: string) {
        await this.databaseService.prisma.tokenBlacklist.create({
            data: { jti: jti },
        });
    }
}
