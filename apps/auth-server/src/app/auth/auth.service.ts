import { AuthorizeQueryParams } from '@dnd-mapp/auth-domain';
import { toBase64 } from '@dnd-mapp/backend-utils';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { ClientService } from '../client';
import { AuthTransactionRepository } from './auth-transaction.repository';

@Injectable()
export class AuthService {
    private readonly authTransactionRepository: AuthTransactionRepository;
    private readonly clientService: ClientService;

    public constructor(authTransactionRepository: AuthTransactionRepository, clientService: ClientService) {
        this.authTransactionRepository = authTransactionRepository;
        this.clientService = clientService;
    }

    public async authorize(params: AuthorizeQueryParams) {
        const { clientId, redirectUrl } = params;

        const client = await this.clientService.getById(clientId);

        if (client === null || !client.isRedirectUrlValid(redirectUrl)) {
            throw new ForbiddenException();
        }
        const { id } = await this.authTransactionRepository.create(params);
        return toBase64(id);
    }
}
