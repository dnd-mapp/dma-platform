import { AuthServerConfig, ConfigurationNamespaces, ServerConfig } from '@dnd-mapp/backend-utils';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { readFile } from 'fs/promises';
import { AppModule } from './app';

async function getSslFiles() {
    const certPath = process.env['SSL_CERT_PATH'];
    const keyPath = process.env['SSL_KEY_PATH'];

    if (!certPath || !keyPath) return { ssl: false };
    const cert = await readFile(certPath, { encoding: 'utf8' });
    const key = await readFile(keyPath, { encoding: 'utf8' });

    return {
        ssl: true,
        cert: cert,
        key: key,
    };
}

async function bootstrap() {
    const { ssl, cert, key } = await getSslFiles();

    const app = await NestFactory.create(
        AppModule,
        new FastifyAdapter(ssl ? { https: { cert: cert, key: key } } : undefined),
        {
            logger: ['log', 'warn', 'error', 'fatal'],
            cors: {
                origin: [
                    'http://localhost:4300',
                    'https://localhost.auth.dndmapp.dev:4300',
                    'http://localhost:4200',
                    'https://localhost.www.dndmapp.dev:4200',
                ],
                methods: ['GET', 'POST'],
                allowedHeaders: ['content-type', 'authorization'],
            },
        },
    );
    const configService = app.get(ConfigService<AuthServerConfig, true>);
    const { host, port } = configService.get<ServerConfig>(ConfigurationNamespaces.SERVER);

    await app.listen(port, host);

    Logger.log(`🚀 Application is running on: ${ssl ? 'https' : 'http'}://${host}:${port}`);
}

bootstrap().catch((error) => console.error(error));
