import { Injectable } from '@nestjs/common';
import { ClientRepository } from './client.repository';

@Injectable()
export class ClientService {
    private readonly clientRepository: ClientRepository;

    public constructor(clientRepository: ClientRepository) {
        this.clientRepository = clientRepository;
    }

    public async getById(clientId: string) {
        return await this.clientRepository.findOneById(clientId);
    }
}
