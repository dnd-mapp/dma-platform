import { waitForPortOpen } from '@nx/node/utils';

module.exports = async function () {
    const host = process.env['AUTH_SERVER_HOST'] || 'localhost';
    const port = process.env['AUTH_SERVER_PORT'] ? Number(process.env['AUTH_SERVER_PORT']) : 4350;

    await waitForPortOpen(port, { host });
};
