import { Module } from '@nestjs/common';
import { AuthModule } from './auth';
import { HealthModule } from './health';

@Module({
    imports: [HealthModule, AuthModule],
})
export class AppModule {}
