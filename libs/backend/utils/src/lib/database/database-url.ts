export interface DatabaseConfiguration {
    host: string;
    port: number;
    schema: string;
    user: string;
    password: string;
}

export const DEFAULT_DATABASE_CONFIGURATION: DatabaseConfiguration = {
    host: 'localhost',
    port: 3306,
    schema: 'my_db',
    user: 'root',
    password: 'password',
};

export function databaseUrl(config: Partial<DatabaseConfiguration>) {
    const { host, port, schema, user, password } = {
        ...DEFAULT_DATABASE_CONFIGURATION,
        ...config,
    };
    return `mysql://${user}:${password}@${host}:${port}/${schema}`;
}
