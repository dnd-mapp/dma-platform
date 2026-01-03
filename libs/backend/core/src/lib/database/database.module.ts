import { DynamicModule, Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { providePrismaClient } from './provide-prisma-client';

@Module({})
export class DatabaseModule {
    public static withPrismaClient(prismaCtor: unknown): DynamicModule {
        return {
            module: DatabaseModule,
            providers: [DatabaseService, providePrismaClient(prismaCtor)],
            exports: [DatabaseService],
        };
    }
}
