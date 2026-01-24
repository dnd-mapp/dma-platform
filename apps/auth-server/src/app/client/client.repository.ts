import { fromRawClientToDto, selectClientProperties } from '@dnd-mapp/auth-domain';
import { PrismaClient } from '@dnd-mapp/auth-server/prisma/client';
import { DatabaseService } from '@dnd-mapp/backend-core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ClientRepository {
    private readonly databaseService: DatabaseService<PrismaClient>;

    public constructor(databaseService: DatabaseService<PrismaClient>) {
        this.databaseService = databaseService;
    }

    public async findOneById(clientId: string) {
        const result = await this.databaseService.prisma.client.findUnique({
            select: selectClientProperties,
            where: { id: clientId },
        });

        if (result === null) return null;
        return fromRawClientToDto(result);
    }
}
