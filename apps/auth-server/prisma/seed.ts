import {
    DatabaseConfiguration,
    DEFAULT_AUTH_DB_CONFIG,
    EnvironmentVariables,
    hashPassword,
    isProduction,
} from '@dnd-mapp/backend-utils';
import { parseInt } from '@dnd-mapp/shared-utils';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { readFile, writeFile } from 'fs/promises';
import { PrismaClient } from '../src/prisma/client';

const databaseConfig: DatabaseConfiguration = {
    host: process.env[EnvironmentVariables.AUTH_DB_HOST] || DEFAULT_AUTH_DB_CONFIG.host,
    port: parseInt(DEFAULT_AUTH_DB_CONFIG.port, process.env[EnvironmentVariables.AUTH_DB_PORT]),
    schema: process.env[EnvironmentVariables.AUTH_DB_SCHEMA] || DEFAULT_AUTH_DB_CONFIG.schema,
    user: process.env[EnvironmentVariables.AUTH_DB_USER] || DEFAULT_AUTH_DB_CONFIG.user,
    password: process.env[EnvironmentVariables.AUTH_DB_PASSWORD] || DEFAULT_AUTH_DB_CONFIG.password,
};

const passwordPepper = process.env[EnvironmentVariables.AUTH_SERVER_PASSWORD_PEPPER];

const mariaDbAdapter = new PrismaMariaDb({
    user: databaseConfig.user,
    password: databaseConfig.password,
    host: databaseConfig.host,
    port: databaseConfig.port,
    database: databaseConfig.schema,
});
const prisma = new PrismaClient({ adapter: mariaDbAdapter });

const dndMappClientConfigPath = '../dnd-mapp/public/config.json';
const dndMappClientConfigTemplatePath = '../dnd-mapp/public/config.template.json';

async function generateClientConfig(clientId: string) {
    console.log('Reading Client config template file...');
    const templateContents = await readFile(dndMappClientConfigTemplatePath, { encoding: 'utf8' });
    const clientConfig = JSON.parse(templateContents);

    clientConfig.clientId = clientId;

    console.log('Writing Client config file...');
    await writeFile(dndMappClientConfigPath, `${JSON.stringify(clientConfig, null, 4)}\n`);
}

async function seedClients() {
    const client = await prisma.client.create({
        data: {
            audience: 'dnd-mapp',
            redirectUrls: {
                createMany: {
                    data: [{ url: 'http://localhost:4200' }, { url: 'https://localhost.www.dndmapp.dev:4200' }],
                },
            },
        },
    });

    console.log(`Created Client with ID: "${client.id}"`);

    if (!isProduction()) {
        console.log('Creating Client config files...');
        await generateClientConfig(client.id);
    }
}

async function seedUsers() {
    if (!passwordPepper) return;
    await prisma.user.create({
        data: {
            username: 'admin',
            password: await hashPassword('changemenow', passwordPepper),
        },
    });
}

export async function seed() {
    if (!passwordPepper) throw new Error('Password Pepper is required');
    await seedClients();
    await seedUsers();
}

seed().finally(async () => {
    await prisma.$disconnect();
});
