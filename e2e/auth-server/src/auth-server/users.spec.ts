import axios from 'axios';

describe('GET /users', () => {
    it('should return a message', async () => {
        const response = await axios.get(`/users`);

        expect(response.status).toBe(200);
    });
});
