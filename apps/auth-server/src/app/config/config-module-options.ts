import { ConfigModuleOptions } from '@nestjs/config';
import databaseConfig from './database.config';
import { validateEnvironmentVariables } from './environment-variables';
import serverConfig from './server.config';

export const configModuleOptions: ConfigModuleOptions = {
    cache: true,
    envFilePath: ['.env'],
    expandVariables: true,
    isGlobal: true,
    load: [serverConfig, databaseConfig],
    validate: validateEnvironmentVariables,
};
