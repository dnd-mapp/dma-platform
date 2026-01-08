import { killPort } from '@nx/node/utils';

module.exports = async function testSetup() {
    const port = process.env['PORT'] ? Number(process.env['PORT']) : 4350;

    await killPort(port);
};
