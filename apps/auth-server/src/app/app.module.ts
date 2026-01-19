import { Module } from '@nestjs/common';
import { HealthModule } from './health';

@Module({
    imports: [HealthModule],
})
export class AppModule {}
