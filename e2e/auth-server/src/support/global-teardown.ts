import { killPort } from '@nx/node/utils';

export default async function testSetup() {
    const port = process.env['PORT'] ? Number(process.env['PORT']) : 4350;

    await killPort(port);
}
