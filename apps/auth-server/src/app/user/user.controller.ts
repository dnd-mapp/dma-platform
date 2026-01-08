import { CreateUserDto, UpdateUserDto } from '@dnd-mapp/auth/domain';
import {
    Body,
    Controller,
    Delete,
    Get,
    Headers,
    HttpStatus,
    NotFoundException,
    Param,
    Post,
    PreconditionFailedException,
    Put,
    Res,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { UserService } from './user.service';

@Controller('/users')
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
        const user = await this.userService.create(data);
        const url = response.request.url;

        if (!user.deletedAt) {
            response.status(HttpStatus.CREATED).headers({
                Location: `${url}/${user.id}`,
            });
        }
        return user;
    }

    @Get(`/:userId`)
    public async getById(
        @Param('userId') userId: string,
        @Res({ passthrough: true }) response: FastifyReply,
        @Headers('If-None-Match') ifNoneMatch?: string,
    ) {
        const byId = await this.userService.getById(userId);

        if (!byId) {
            throw new NotFoundException(`User with ID "${userId}" was not found`);
        }
        response.headers({ ETag: `${byId.version}` });

        if (ifNoneMatch && `${byId.version}` === ifNoneMatch) {
            response.status(HttpStatus.NOT_MODIFIED);
            return;
        }
        return byId;
    }

    @Put('/:userId')
    public async update(
        @Param('userId') userId: string,
        @Body() data: UpdateUserDto,
        @Headers('If-Match') ifMatch?: string,
    ) {
        if (!ifMatch) throw new PreconditionFailedException();
        return await this.userService.update(userId, data, ifMatch);
    }

    // TODO - Only allow Users with `Admin` role or Users to delete their own account.
    @Delete('/:userId')
    public async removeById(@Param('userId') userId: string, @Res({ passthrough: true }) response: FastifyReply) {
        await this.userService.removeById(userId);

        response.status(HttpStatus.NO_CONTENT);
    }
}
