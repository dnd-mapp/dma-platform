import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth';
import { configModuleOptions } from './core';
import { HealthModule } from './health';

@Module({
    imports: [ConfigModule.forRoot(configModuleOptions), HealthModule, AuthModule],
})
export class AppModule {}
