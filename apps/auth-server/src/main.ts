import { AuthServerConfig, ConfigurationNamespaces, ServerConfig } from '@dnd-mapp/backend-utils';
import { tryCatch } from '@dnd-mapp/shared-utils';
import fastifyCookie from '@fastify/cookie';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
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

    if (ssl) {
        Logger.log('SSL Configuration detected. Starting server in HTTPS mode');
    } else {
        Logger.warn('No SSL certificates found. Starting server in insecure HTTP mode');
    }

    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter(ssl ? { https: { cert: cert, key: key } } : undefined),
        {
            logger: ['log', 'warn', 'error', 'fatal'],
            cors: {
                // TODO - Retrieve valid origins from registered client their redirect URLs
                origin: [
                    'http://localhost:4300',
                    'https://localhost:4300',
                    'http://localhost.auth.dndmapp.dev:4300',
                    'https://localhost.auth.dndmapp.dev:4300',
                    'http://localhost:4200',
                    'https://localhost:4200',
                    'http://localhost.www.dndmapp.dev:4200',
                    'https://localhost.www.dndmapp.dev:4200',
                ],
                methods: ['GET', 'POST'],
                allowedHeaders: ['content-type', 'authorization'],
                credentials: true,
            },
        },
    );
    const configService = app.get(ConfigService<AuthServerConfig, true>);
    const { host, port, cookieSecret } = configService.get<ServerConfig>(ConfigurationNamespaces.SERVER);

    await app.register(fastifyCookie, {
        // TODO - Enable secret rotation.
        secret: cookieSecret,
        algorithm: 'sha256',
    });
    Logger.log('Fastify Cookie plugin registered');

    const { error } = await tryCatch(app.listen(port, host));

    if (error) {
        Logger.fatal(`Failed to start the application: ${error.message}`, error.stack);
        process.exit(1);
    }
    Logger.log(`🚀 Application is running on: ${ssl ? 'https' : 'http'}://${host}:${port}`);
}

bootstrap().catch((error) => console.error(error));
