import { ClientBuilder, RedirectUrlBuilder } from '@dnd-mapp/auth-domain';
import { PrismaClient, Client as RawClient, RedirectUrl as RawRedirectUrl } from '@dnd-mapp/auth-server/prisma/client';
import { DatabaseService } from '@dnd-mapp/backend-utils';
import { Injectable } from '@nestjs/common';

interface RawClientWithRedirectUrls extends RawClient {
    redirectUrls: RawRedirectUrl[];
}

function fromRawRedirectUrlToDto(raw: RawRedirectUrl) {
    return new RedirectUrlBuilder().withId(raw.id).withUrl(raw.url).build();
}

function fromRawRedirectUrlsToDto(raw: RawRedirectUrl[]) {
    return raw.map((rawEntry) => fromRawRedirectUrlToDto(rawEntry));
}

function fromRawClientToDto(raw: RawClientWithRedirectUrls | null) {
    if (raw === null) return null;
    return new ClientBuilder()
        .withId(raw.id)
        .withAudience(raw.audience)
        .withRedirectUrls(...fromRawRedirectUrlsToDto(raw.redirectUrls))
        .build();
}

@Injectable()
export class ClientRepository {
    private readonly databaseService: DatabaseService<PrismaClient>;

    public constructor(databaseService: DatabaseService<PrismaClient>) {
        this.databaseService = databaseService;
    }

    public async findOneById(clientId: string) {
        const result = await this.databaseService.prisma.client.findUnique({
            where: { id: clientId },
            select: {
                id: true,
                audience: true,
                redirectUrls: {
                    select: {
                        id: true,
                        url: true,
                        clientId: true,
                    },
                },
            },
        });

        return fromRawClientToDto(result);
    }
}
