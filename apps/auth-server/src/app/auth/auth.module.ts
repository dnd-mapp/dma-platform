import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientModule } from '../client';
import { DmaJwtModule } from '../jwt';
import { TokenModule } from '../token';
import { UserModule } from '../user';
import { AuthTransactionRepository } from './auth-transaction.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    providers: [AuthService, AuthTransactionRepository],
    imports: [ConfigModule, ClientModule, UserModule, TokenModule, DmaJwtModule],
    controllers: [AuthController],
})
export class AuthModule {}
