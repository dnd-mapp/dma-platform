import { UserBuilder } from '@dnd-mapp/auth-domain';
import { PrismaClient, User as RawUser } from '@dnd-mapp/auth-server/prisma/client';
import { DatabaseService } from '@dnd-mapp/backend-utils';
import { Injectable } from '@nestjs/common';

function fromRawToDto(raw: RawUser | null) {
    if (raw === null) return null;
    return new UserBuilder().withId(raw.id).withUsername(raw.username).withPassword(raw.password).build();
}

@Injectable()
export class UserRepository {
    private readonly databaseService: DatabaseService<PrismaClient>;

    public constructor(databaseService: DatabaseService<PrismaClient>) {
        this.databaseService = databaseService;
    }

    public async findById(userId: string) {
        const result = await this.databaseService.prisma.user.findUnique({
            where: { id: userId },
        });
        return fromRawToDto(result);
    }

    public async findByUsername(username: string) {
        const result = await this.databaseService.prisma.user.findUnique({
            where: { username: username },
        });
        return fromRawToDto(result);
    }
}
