import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PasswordService } from './password.service';

@Module({
    imports: [ConfigModule],
    providers: [PasswordService],
    exports: [PasswordService],
})
export class PasswordModule {}
