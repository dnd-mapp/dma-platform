import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configModuleOptions } from './config';
import { UserModule } from './user';

@Module({
    imports: [ConfigModule.forRoot(configModuleOptions), UserModule],
})
export class AppModule {}
