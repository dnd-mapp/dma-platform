import {
    AuthorizeQueryParams,
    AuthTransactionDto,
    fromRawAuthTransactionToDto,
    selectAuthTransactionProperties,
} from '@dnd-mapp/auth-domain';
import { PrismaClient } from '@dnd-mapp/auth-server/prisma/client';
import { DatabaseService } from '@dnd-mapp/backend-core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthTransactionRepository {
    private readonly databaseService: DatabaseService<PrismaClient>;

    public constructor(databaseService: DatabaseService<PrismaClient>) {
        this.databaseService = databaseService;
    }

    public async findOneById(transactionId: string) {
        const result = await this.databaseService.prisma.authTransaction.findUnique({
            select: selectAuthTransactionProperties,
            where: { id: transactionId },
        });

        if (result === null) return null;
        return fromRawAuthTransactionToDto(result);
    }

    public async findOneByAuthCodeAndClientId(authCode: string, clientId: string) {
        const result = await this.databaseService.prisma.authTransaction.findFirst({
            select: selectAuthTransactionProperties,
            where: { authCode: authCode, clientId: clientId },
        });

        if (result === null) return null;
        return fromRawAuthTransactionToDto(result);
    }

    public async create(data: AuthorizeQueryParams) {
        const { clientId, nonce, state, codeChallenge, redirectUrl } = data;

        const result = await this.databaseService.prisma.authTransaction.create({
            select: selectAuthTransactionProperties,
            data: {
                clientId: clientId,
                nonce: nonce,
                state: state,
                codeChallenge: codeChallenge,
                redirectUrl: redirectUrl,
            },
        });
        return fromRawAuthTransactionToDto(result);
    }

    public async update(data: AuthTransactionDto) {
        const { id, authCode, authCodeExpiry } = data;
        const result = await this.databaseService.prisma.authTransaction.update({
            select: selectAuthTransactionProperties,
            where: { id: id },
            data: {
                authCode: authCode,
                authCodeExpiry: authCodeExpiry,
            },
        });
        return fromRawAuthTransactionToDto(result);
    }
}
