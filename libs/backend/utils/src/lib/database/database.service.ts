import { Inject, Injectable, Logger, OnApplicationShutdown, OnModuleInit, Type } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { ConfigurationNamespaces, DatabaseConfig } from '../config';
import { PrismaClient } from './types';
import { PRISMA_CLIENT_CTOR } from './with-prisma-client';

@Injectable()
export class DatabaseService<T extends PrismaClient, Config extends Record<string, unknown> = Record<string, unknown>>
    implements OnModuleInit, OnApplicationShutdown
{
    private readonly configService: ConfigService<Config, true>;
    private readonly prismaClient: T;

    private readonly logger = new Logger(DatabaseService.name);

    public get prisma() {
        return this.prismaClient;
    }

    public constructor(
        configService: ConfigService<Config, true>,
        @Inject(PRISMA_CLIENT_CTOR) PrismaClientCtor: Type<T>,
    ) {
        this.configService = configService;

        const { user, password, host, port, schema } = this.configService.get<DatabaseConfig>(
            ConfigurationNamespaces.DATABASE,
        );

        const mariaDbAdapter = new PrismaMariaDb({
            user: user,
            password: password,
            host: host,
            port: port,
            database: schema,
            connectionLimit: 3,
            acquireTimeout: 1_000,
            logger: {
                network: (message) => this.logger.debug(message),
                query: (message) => this.logger.debug(message),
                warning: (message) => this.logger.warn(message),
                error: (error) => {
                    throw error;
                },
            },
        });
        this.prismaClient = new PrismaClientCtor({ adapter: mariaDbAdapter });
    }

    public async onModuleInit() {
        await this.prismaClient.$connect();
    }

    public async onApplicationShutdown() {
        await this.prismaClient.$disconnect();
    }
}
