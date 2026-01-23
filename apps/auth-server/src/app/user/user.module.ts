import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
    imports: [],
    providers: [UserService, UserRepository],
    exports: [UserService],
})
export class UserModule {}
