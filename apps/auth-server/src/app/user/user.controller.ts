import { Controller, Get } from '@nestjs/common';
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
}
