import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientModule } from '../client';
import { UserModule } from '../user';
import { AuthTransactionRepository } from './auth-transaction.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports: [ConfigModule, ClientModule, UserModule],
    providers: [AuthService, AuthTransactionRepository],
    controllers: [AuthController],
})
export class AuthModule {}
