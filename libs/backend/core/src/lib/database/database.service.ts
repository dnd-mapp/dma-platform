import { ConfigurationNamespaces, DatabaseConfig } from '@dnd-mapp/backend-utils';
import { tryCatch } from '@dnd-mapp/shared-utils';
import { Inject, Injectable, Logger, OnApplicationShutdown, OnModuleInit, Type } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
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
                network: (message) => this.logger.debug(`Network: ${message}`),
                query: (message) => this.logger.debug(`Query: ${message}`),
                warning: (message) => this.logger.warn(`MariaDB Warning: ${message}`),
                error: (error) => {
                    this.logger.error(`MariaDB Fatal Error: ${error.message}`, error.stack);
                    throw error;
                },
            },
        });
        this.prismaClient = new PrismaClientCtor({
            adapter: mariaDbAdapter,
            log: [
                { emit: 'event', level: 'query' },
                { emit: 'event', level: 'info' },
                { emit: 'event', level: 'warn' },
                { emit: 'event', level: 'error' },
            ],
        });
    }

    public async onModuleInit() {
        this.logger.log('Connecting to MariaDB...');
        const { error } = await tryCatch(this.prismaClient.$connect());

        if (error) {
            this.logger.error(`Failed to connect to MariaDB during initialization`, error.stack);
            throw error;
        }
        this.logger.log('Successfully connect to MariaDB');
    }

    public async onApplicationShutdown() {
        this.logger.log('Disconnecting from MariaDB...');
        await this.prismaClient.$disconnect();

        this.logger.log('Disconnected from MariaDB');
    }
}
