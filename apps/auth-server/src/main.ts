import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const port = process.env['PORT'] || 4350;

    await app.listen(port);

    Logger.log(`🚀 Application is running on: http://localhost:${port}}`);
}

bootstrap().catch((error) => console.error(error));
