import { CreateUserDto } from '@dnd-mapp/domain/auth';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PasswordService } from '../password';
import { FindOneParams } from './models';
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

    public async getById(userId: string, params: FindOneParams = { includeDeleted: false }) {
        return await this.userRepository.findById(userId, params);
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
    public async removeById(userId: string) {
        const byId = await this.getById(userId, { includeDeleted: true });

        if (byId?.deletedAt !== null) return;
        else if (byId === null) {
            throw new NotFoundException(`Could not remove User with ID "${userId}". - Reason: User was not found`);
        }
        await this.userRepository.removeById(userId);
    }

    private async isUsernameTaken(username: string) {
        const byUsername = await this.getByUsername(username);
        return byUsername !== null;
    }
}
