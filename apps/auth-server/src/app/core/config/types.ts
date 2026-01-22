import { ConfigurationNamespaces } from '@dnd-mapp/backend-utils';

export interface ServerConfig {
    host: string;
    port: number;
}

export interface AuthServerConfig {
    [ConfigurationNamespaces.SERVER]: ServerConfig;
}
