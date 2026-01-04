import { CreateUserDto } from '@dnd-mapp/domain/auth';
import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    private readonly userService: UserService;

    public constructor(userService: UserService) {
        this.userService = userService;
    }

    @Get()
    public async getAll() {
        return await this.userService.getAll();
    }

    @Post()
    public async create(@Body() data: CreateUserDto, @Res({ passthrough: true }) response: FastifyReply) {
        const created = await this.userService.create(data);
        const url = response.request.url;

        response.status(HttpStatus.CREATED).headers({
            Location: `${url}/${created.id}`,
        });

        return created;
    }
}
