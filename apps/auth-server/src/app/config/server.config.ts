import { parseInt } from '@dnd-mapp/shared/utils';
import { registerAs } from '@nestjs/config';
import { DEFAULT_SERVER_HOST, DEFAULT_SERVER_PORT, EnvironmentVariables } from './environment-variables';

export interface ServerConfiguration {
    host: string;
    port: number;
    pepper: string;
}

export const SERVER_CONFIGURATION_NAMESPACE = 'server';

export default registerAs(
    SERVER_CONFIGURATION_NAMESPACE,
    () =>
        ({
            host: process.env[EnvironmentVariables.SERVER_HOST] || DEFAULT_SERVER_HOST,
            port: parseInt(process.env[EnvironmentVariables.SERVER_PORT], DEFAULT_SERVER_PORT),
            pepper: process.env[EnvironmentVariables.SERVER_PASSWORD_PEPPER],
        }) satisfies ServerConfiguration,
);
