import { waitForPortOpen } from '@nx/node/utils';

export default async function globalSetup() {
    const host = process.env['HOST'] || 'localhost';
    const port = process.env['PORT'] ? Number(process.env['PORT']) : 4350;

    await waitForPortOpen(port, { host });
}
