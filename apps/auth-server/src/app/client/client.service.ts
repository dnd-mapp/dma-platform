import { Injectable, Logger } from '@nestjs/common';
import { ClientRepository } from './client.repository';

@Injectable()
export class ClientService {
    private readonly clientRepository: ClientRepository;
    private readonly logger = new Logger(ClientService.name);

    public constructor(clientRepository: ClientRepository) {
        this.clientRepository = clientRepository;
    }

    public async getById(clientId: string) {
        const client = await this.clientRepository.findOneById(clientId);

        if (!client) {
            this.logger.debug(`Client lookup failed for ID: "${clientId}"`);
        }
        return client;
    }
}
