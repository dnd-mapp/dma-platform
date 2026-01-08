import axios from 'axios';

module.exports = async function testSetup() {
    const host = process.env['AUTH_SERVER_HOST'] || 'localhost';
    const port = process.env['AUTH_SERVER_PORT'] || 4350;

    axios.defaults.baseURL = `http://${host}:${port}`;
};
