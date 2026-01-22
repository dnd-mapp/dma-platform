import { isProduction } from '@dnd-mapp/backend-utils';
import { ConfigModuleOptions } from '@nestjs/config';
import serverConfiguration from './server.configuration';

export const configModuleOptions: ConfigModuleOptions = {
    envFilePath: isProduction() ? ['.env'] : ['../../.env'],
    expandVariables: true,
    load: [serverConfiguration],
};
