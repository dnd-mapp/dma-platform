import { CreateUserDto, UpdateUserDto } from '@dnd-mapp/domain/auth';
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
        const { username, email, password } = data;

        const byUsername = await this.getByUsername(username);

        if (byUsername) {
            if (byUsername.deletedAt !== null && byUsername.email === email) {
                // TODO - Send account reactivation email
                return byUsername;
            }
            throw new ConflictException(`Could not create User. - Reason: Username "${username}" is already in use`);
        }
        data.password = await this.passwordService.hashPassword(password);

        const created = await this.userRepository.create(data);

        // TODO - Send account activation email

        return created;
    }

    public async update(userId: string, data: UpdateUserDto) {
        const { username } = data;
        const byId = await this.getById(userId);
        const byUsername = await this.getByUsername(username);

        if (byId === null || (byUsername && byUsername.id === userId && byUsername.deletedAt !== null)) {
            throw new NotFoundException(`Could not update User with ID "${userId}". - Reason: User was not found`);
        }
        if (byUsername && byUsername.id !== userId) {
            throw new ConflictException(
                `Could not update User with ID "${userId}". - Reason: Username "${username}" us already in use`,
            );
        }
        return await this.userRepository.update(userId, data);
    }

    public async removeById(userId: string) {
        const byId = await this.getById(userId, { includeDeleted: true });

        if (byId?.deletedAt !== null) return;
        else if (byId === null) {
            throw new NotFoundException(`Could not remove User with ID "${userId}". - Reason: User was not found`);
        }
        await this.userRepository.removeById(userId);
    }

    private async getByUsername(username: string) {
        return await this.userRepository.findByUsername(username);
    }
}
