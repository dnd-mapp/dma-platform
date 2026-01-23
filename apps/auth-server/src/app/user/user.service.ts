import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    private readonly userRepository: UserRepository;

    public constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public async getById(userId: string) {
        return await this.userRepository.findById(userId);
    }

    public async getByUsername(username: string) {
        return await this.userRepository.findByUsername(username);
    }
}
