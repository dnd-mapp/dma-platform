import { Inject, Injectable, OnApplicationShutdown, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { Client, ClientCtor, PRISMA_CLIENT } from './provide-prisma-client';

@Injectable()
export class DatabaseService<T extends Client, C extends ClientCtor<T> = ClientCtor<T>>
    implements OnModuleInit, OnApplicationShutdown
{
    private configService: ConfigService;

    public get prisma() {
        return this.prismaClient;
    }
    private prismaClient: T;

    public constructor(configService: ConfigService, @Inject(PRISMA_CLIENT) Ctor: C) {
        this.configService = configService;

        this.initializePrismaClient(Ctor);
    }

    public async onModuleInit() {
        await this.prismaClient.$connect();
    }

    public async onApplicationShutdown() {
        await this.prismaClient.$disconnect();
    }

    private initializePrismaClient(Ctor: C) {
        const { host, port, schema, user, password } = this.configService.get('database');

        const adapter = new PrismaMariaDb({
            host: host,
            port: port,
            database: schema,
            user: user,
            password: password,
            connectionLimit: 5,
        });

        this.prismaClient = new Ctor({ adapter: adapter });
    }
}
