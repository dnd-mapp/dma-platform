import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth';
import { configModuleOptions, provideSerializerInterceptors } from './config';
import { UserModule } from './user';

@Module({
    imports: [ConfigModule.forRoot(configModuleOptions), UserModule, AuthModule],
    providers: [provideSerializerInterceptors()],
})
export class AppModule {}
