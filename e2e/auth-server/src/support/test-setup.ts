import axios from 'axios';

export default async function testSetup() {
    const host = process.env['HOST'] || 'localhost';
    const port = process.env['PORT'] || 4350;

    axios.defaults.baseURL = `http://${host}:${port}`;
}
