import { DatabaseModule } from '@dnd-mapp/backend/core';
import { Module } from '@nestjs/common';
import { PrismaClient } from '../../prisma/client';
import { PasswordModule } from '../password';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
    imports: [DatabaseModule.withPrismaClient(PrismaClient), PasswordModule],
    controllers: [UserController],
    providers: [UserRepository, UserService],
    exports: [UserService],
})
export class UserModule {}
