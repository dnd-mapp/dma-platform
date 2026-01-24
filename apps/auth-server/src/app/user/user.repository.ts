import { fromRawUserToDto, selectUserProperties } from '@dnd-mapp/auth-domain';
import { PrismaClient } from '@dnd-mapp/auth-server/prisma/client';
import { DatabaseService } from '@dnd-mapp/backend-core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
    private readonly databaseService: DatabaseService<PrismaClient>;

    public constructor(databaseService: DatabaseService<PrismaClient>) {
        this.databaseService = databaseService;
    }

    public async findById(userId: string) {
        const result = await this.databaseService.prisma.user.findUnique({
            select: selectUserProperties,
            where: { id: userId },
        });

        if (result === null) return null;
        return fromRawUserToDto(result);
    }

    public async findByUsername(username: string) {
        const result = await this.databaseService.prisma.user.findUnique({
            select: selectUserProperties,
            where: { username: username },
        });

        if (result === null) return null;
        return fromRawUserToDto(result);
    }
}
