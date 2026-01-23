import { Module } from '@nestjs/common';
import { ClientModule } from '../client';
import { AuthTransactionRepository } from './auth-transaction.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports: [ClientModule],
    providers: [AuthService, AuthTransactionRepository],
    controllers: [AuthController],
})
export class AuthModule {}
