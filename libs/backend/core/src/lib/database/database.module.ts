import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from './database.service';
import { providePrismaClient } from './provide-prisma-client';

@Module({})
export class DatabaseModule {
    public static withPrismaClient(prismaCtor: unknown): DynamicModule {
        return {
            module: DatabaseModule,
            imports: [ConfigModule],
            providers: [DatabaseService, providePrismaClient(prismaCtor)],
            exports: [DatabaseService],
        };
    }
}
