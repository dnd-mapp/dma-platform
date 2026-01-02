import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { AppModule } from './app';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, new FastifyAdapter());
    const port = process.env['PORT'] || 4350;

    await app.listen(port);

    Logger.log(`🚀 Application is running on: http://localhost:${port}}`);
}

bootstrap().catch((error) => console.error(error));
