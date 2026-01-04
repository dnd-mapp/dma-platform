import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configModuleOptions, provideSerializerInterceptors } from './config';
import { UserModule } from './user';

@Module({
    imports: [ConfigModule.forRoot(configModuleOptions), UserModule],
    providers: [provideSerializerInterceptors()],
})
export class AppModule {}
