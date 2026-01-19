import { killPort } from '@nx/node/utils';

module.exports = async function () {
    const port = process.env['AUTH_SERVER_PORT'] ? Number(process.env['AUTH_SERVER_PORT']) : 4350;

    await killPort(port);
};
