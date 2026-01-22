/* eslint-disable @nx/enforce-module-boundaries */
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { readFile, writeFile } from 'fs/promises';
import { parseInt } from '../../../libs/shared/utils/src';
import { PrismaClient } from '../src/prisma/client';
/* eslint-enable @nx/enforce-module-boundaries */

const databaseConfig = {
    host: process.env['AUTH_DB_HOST'] || 'localhost',
    port: parseInt(3306, process.env['AUTH_DB_PORT']),
    schema: process.env['AUTH_DB_SCHEMA'] || 'my_db',
    user: process.env['AUTH_DB_USER'] || 'root',
    password: process.env['AUTH_DB_PASSWORD'] || 'password',
};

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

export async function seed() {
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

    if (process.env['NODE_ENV'] !== 'production') {
        console.log('Creating Client config files...');
        await generateClientConfig(client.id);
    }
}

seed().finally(async () => {
    await prisma.$disconnect();
});
