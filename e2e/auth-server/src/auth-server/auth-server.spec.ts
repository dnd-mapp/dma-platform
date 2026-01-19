import axios from 'axios';

describe('GET /health', () => {
    it('should return that the app is live', async () => {
        const response = await axios.get(`/health/live`);

        expect(response.status).toEqual(200);
        expect(response.data).toEqual({ status: 'OK' });
    });

    it('should return that the app is ready', async () => {
        const response = await axios.get(`/health/ready`);

        expect(response.status).toEqual(200);
        expect(response.data).toEqual({ status: 'OK' });
    });
});
