import { CreateUserDto } from '@dnd-mapp/domain/auth';
import { ConflictException, Injectable } from '@nestjs/common';
import { PasswordService } from '../password';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    private readonly userRepository: UserRepository;
    private readonly passwordService: PasswordService;

    public constructor(userRepository: UserRepository, passwordService: PasswordService) {
        this.userRepository = userRepository;
        this.passwordService = passwordService;
    }

    public async getAll() {
        return await this.userRepository.findAll();
    }

    public async create(data: CreateUserDto) {
        const { username, password } = data;

        if (await this.isUsernameTaken(username)) {
            throw new ConflictException(`Could not create User. - Reason: Username "${username}" is already in use`);
        }
        data.password = await this.passwordService.hashPassword(password);

        return await this.userRepository.create(data);
    }

    private async getByUsername(username: string) {
        return await this.userRepository.findByUsername(username);
    }

    private async isUsernameTaken(username: string) {
        const byUsername = await this.getByUsername(username);
        return byUsername !== null;
    }
}
