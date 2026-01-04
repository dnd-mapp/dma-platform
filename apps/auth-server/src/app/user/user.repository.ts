import { DatabaseService } from '@dnd-mapp/backend/core';
import { CreateUserDto, UserBuilder } from '@dnd-mapp/domain/auth';
import { Injectable } from '@nestjs/common';
import { PrismaClient, User as PrismaUser } from '../../prisma/client';

function transformRecordToDto(record: PrismaUser) {
    if (record === null) return null;
    return new UserBuilder()
        .withId(record.id)
        .withUsername(record.username)
        .withPassword(record.password)
        .withEmail(record.email)
        .createdAt(record.createdAt)
        .lastUpdatedAt(record.updatedAt)
        .build();
}

function transformAllRecordsToDto(records: PrismaUser[]) {
    return records.map((record) => transformRecordToDto(record));
}

@Injectable()
export class UserRepository {
    private readonly databaseService: DatabaseService<PrismaClient>;

    public constructor(databaseService: DatabaseService<PrismaClient>) {
        this.databaseService = databaseService;
    }

    public async findAll() {
        const results = await this.databaseService.prisma.user.findMany();
        return transformAllRecordsToDto(results);
    }

    public async findByUsername(username: string) {
        const result = await this.databaseService.prisma.user.findUnique({ where: { username: username } });
        return transformRecordToDto(result);
    }

    public async create(data: CreateUserDto) {
        const { username, password, email } = data;

        const created = await this.databaseService.prisma.user.create({
            data: {
                username: username,
                password: password,
                email: email,
            },
        });
        return transformRecordToDto(created);
    }
}
