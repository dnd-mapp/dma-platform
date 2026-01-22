import { ConfigurationNamespaces } from './configuration-namespace';

export interface ServerConfig {
    host: string;
    port: number;
}

export interface AuthServerConfig {
    [ConfigurationNamespaces.SERVER]: ServerConfig;
}
