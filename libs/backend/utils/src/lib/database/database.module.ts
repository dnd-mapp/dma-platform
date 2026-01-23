import { DynamicModule, Module, Type } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from './database.service';
import { PrismaClient } from './types';
import { withPrismaClient } from './with-prisma-client';

@Module({})
export class DatabaseModule {
    public static forRoot<T extends PrismaClient>(ctor: Type<T>): DynamicModule {
        return {
            module: DatabaseModule,
            global: true,
            imports: [ConfigModule],
            providers: [withPrismaClient<T>(ctor), DatabaseService<T>],
            exports: [DatabaseService<T>],
        };
    }
}
