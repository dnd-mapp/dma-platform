import { validationPipeOptions } from '@dnd-mapp/backend/core';
import { tryCatch } from '@dnd-mapp/shared/utils';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { readFile } from 'fs/promises';
import { AppModule, SERVER_CONFIGURATION_NAMESPACE, ServerConfiguration } from './app';

async function getFileContents(filePath: string) {
    const { data, error } = await tryCatch(readFile(filePath, { encoding: 'utf-8' }));

    if (error) throw error;
    return data;
}

async function getSslCertificate() {
    const certPath = process.env['SSL_CERT_PATH'];
    const keyPath = process.env['SSL_KEY_PATH'];

    if (!certPath || !keyPath) return { sslEnabled: false };

    const cert = await getFileContents(certPath);
    const key = await getFileContents(keyPath);

    return {
        sslEnabled: true,
        cert: cert,
        key: key,
    };
}

async function bootstrap() {
    const { sslEnabled, cert, key } = await getSslCertificate();

    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter(sslEnabled ? { https: { cert: cert, key: key } } : undefined),
    );
    const configService = app.get(ConfigService);

    const { host, port } = configService.get<ServerConfiguration>(SERVER_CONFIGURATION_NAMESPACE)!;

    await app.listen(port, host);

    app.useGlobalPipes(new ValidationPipe(validationPipeOptions));

    app.enableShutdownHooks();

    Logger.log(`🚀 Application is running on: http://${host}:${port}}`);
}

bootstrap().catch((error) => console.error(error));
