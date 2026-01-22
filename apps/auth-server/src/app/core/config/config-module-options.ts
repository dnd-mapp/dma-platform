import { isProduction } from '@dnd-mapp/backend-utils';
import { ConfigModuleOptions } from '@nestjs/config';
import serverConfiguration from './server.configuration';
import { validateEnvironmentVariables } from './validate-environment-variables';

export const configModuleOptions: ConfigModuleOptions = {
    envFilePath: isProduction() ? ['.env'] : ['../../.env'],
    expandVariables: true,
    load: [serverConfiguration],
    validate: validateEnvironmentVariables,
};
