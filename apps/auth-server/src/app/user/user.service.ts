import { Injectable, Logger } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    private readonly userRepository: UserRepository;
    private readonly logger = new Logger(UserService.name);

    public constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public async getById(userId: string) {
        const user = await this.userRepository.findById(userId);

        if (!user) {
            this.logger.debug(`User lookup failed for ID: "${userId}"`);
        }
        return user;
    }

    public async getByUsername(username: string) {
        const user = await this.userRepository.findByUsername(username);

        if (!user) {
            this.logger.debug(`User lookup failed for username: "${username}"`);
        }
        return user;
    }
}
