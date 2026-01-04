import { validationPipeOptions } from '@dnd-mapp/backend/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule, SERVER_CONFIGURATION_NAMESPACE, ServerConfiguration } from './app';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
    const configService = app.get(ConfigService);

    const { host, port } = configService.get<ServerConfiguration>(SERVER_CONFIGURATION_NAMESPACE);

    await app.listen(port, host);

    app.useGlobalPipes(new ValidationPipe(validationPipeOptions));

    Logger.log(`🚀 Application is running on: http://${host}:${port}}`);
}

bootstrap().catch((error) => console.error(error));
