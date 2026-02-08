import { PrismaClient } from '@dnd-mapp/auth-server/prisma/client';
import { DatabaseModule, provideHttpExceptionFilter } from '@dnd-mapp/backend-core';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth';
import { ClientModule } from './client';
import { configModuleOptions } from './core';
import { HealthModule } from './health';
import { UserModule } from './user';

@Module({
    imports: [
        ConfigModule.forRoot(configModuleOptions),
        DatabaseModule.forRoot(PrismaClient),
        HealthModule,
        AuthModule,
        ClientModule,
        UserModule,
    ],
    providers: [provideHttpExceptionFilter()],
})
export class AppModule {}
