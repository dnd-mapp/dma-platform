import { PrismaClient } from '@dnd-mapp/auth-server/prisma/client';
import { DatabaseModule } from '@dnd-mapp/backend-utils';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth';
import { ClientModule } from './client';
import { configModuleOptions } from './core';
import { HealthModule } from './health';

@Module({
    imports: [
        ConfigModule.forRoot(configModuleOptions),
        DatabaseModule.forRoot(PrismaClient),
        HealthModule,
        AuthModule,
        ClientModule,
    ],
})
export class AppModule {}
