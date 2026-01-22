import { ConfigurationNamespaces } from './configuration-namespace';

export interface ServerConfig {
    host: string;
    port: number;
}

export interface DatabaseConfig {
    host: string;
    port: number;
    schema: string;
    user: string;
    password: string;
}

export interface AuthServerConfig {
    [ConfigurationNamespaces.SERVER]: ServerConfig;
    [ConfigurationNamespaces.DATABASE]: DatabaseConfig;
}
