/* eslint-disable @nx/enforce-module-boundaries */
import { config } from '@dotenvx/dotenvx';
import { defineConfig } from 'prisma/config';
import { DatabaseConfiguration, databaseUrl, EnvironmentVariables } from '../../libs/backend/utils/src';
import { parseInt } from '../../libs/shared/utils/src';
/* eslint-enable @nx/enforce-module-boundaries */

config({ path: ['../../.env'], strict: false, ignore: ['MISSING_ENV_FILE'], quiet: true });

const databaseConfig: Partial<DatabaseConfiguration> = {
    host: process.env[EnvironmentVariables.AUTH_DB_HOST],
    port: parseInt(3306, process.env[EnvironmentVariables.AUTH_DB_PORT]),
    schema: process.env[EnvironmentVariables.AUTH_DB_SCHEMA],
    user: process.env[EnvironmentVariables.AUTH_DB_USER],
    password: process.env[EnvironmentVariables.AUTH_DB_PASSWORD],
};

export default defineConfig({
    schema: 'prisma/schema.prisma',
    migrations: {
        path: 'prisma/migrations',
        seed: 'tsx --tsconfig tsconfig.prisma.json prisma/seed.ts',
    },
    datasource: {
        url: databaseUrl(databaseConfig),
        shadowDatabaseUrl: `${databaseUrl(databaseConfig)}_shadow`,
    },
});
