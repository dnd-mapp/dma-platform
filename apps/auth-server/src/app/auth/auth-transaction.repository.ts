import { AuthorizeQueryParams, AuthTransactionBuilder } from '@dnd-mapp/auth-domain';
import { PrismaClient, AuthTransaction as RawAuthTransaction } from '@dnd-mapp/auth-server/prisma/client';
import { DatabaseService } from '@dnd-mapp/backend-utils';
import { Injectable } from '@nestjs/common';

function fromRawToDto(raw: RawAuthTransaction) {
    return new AuthTransactionBuilder()
        .withId(raw.id)
        .withClientId(raw.clientId)
        .withState(raw.state)
        .withNonce(raw.nonce)
        .withCodeChallenge(raw.codeChallenge)
        .build();
}

@Injectable()
export class AuthTransactionRepository {
    private readonly databaseService: DatabaseService<PrismaClient>;

    public constructor(databaseService: DatabaseService<PrismaClient>) {
        this.databaseService = databaseService;
    }

    public async create(data: AuthorizeQueryParams) {
        const { clientId, nonce, state, codeChallenge } = data;

        const result = await this.databaseService.prisma.authTransaction.create({
            data: {
                clientId: clientId,
                nonce: nonce,
                state: state,
                codeChallenge: codeChallenge,
            },
        });
        return fromRawToDto(result);
    }
}
