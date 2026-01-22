import { isProduction } from '@dnd-mapp/backend-utils';
import { ConfigModuleOptions } from '@nestjs/config';

export const configModuleOptions: ConfigModuleOptions = {
    envFilePath: isProduction() ? ['.env'] : ['../../.env'],
    expandVariables: true,
};
