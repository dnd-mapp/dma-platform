import { config } from '@dotenvx/dotenvx';
import { defineConfig } from 'prisma/config';

// Needs to be done so that Prisma can import the module
/* eslint-disable-next-line @nx/enforce-module-boundaries */
import { parseInt } from '../../libs/shared/utils/src';

config({ path: ['.env'], quiet: true, ignore: ['MISSING_ENV_FILE'], strict: false });

const databaseConfig = {
    host: process.env['AUTH_DB_HOST'] || 'localhost',
    port: parseInt(process.env['AUTH_DB_PORT'], 3306),
    schema: process.env['AUTH_DB_SCHEMA'] || 'my_db',
    user: process.env['AUTH_DB_USER'] || 'root',
    password: process.env['AUTH_DB_PASSWORD'],
};

interface DatabaseUrlParams {
    host: string;
    port: number;
    schema: string;
    user: string;
    password: string;
}

function databaseUrl(params: DatabaseUrlParams) {
    const { host, port, schema, user, password } = params;

    if (!password) throw new Error('Database password is not provided');
    return `mysql://${user}:${password}@${host}:${port}/${schema}`;
}

const { host, port, schema, user, password } = databaseConfig;

export default defineConfig({
    schema: 'prisma/schema.prisma',
    migrations: {
        path: 'prisma/migrations',
    },
    datasource: {
        url: databaseUrl({ host: host, port: port, schema: schema, user: user, password }),
        shadowDatabaseUrl: databaseUrl({ host: host, port: port, schema: `${schema}_shadow`, user: user, password }),
    },
});
