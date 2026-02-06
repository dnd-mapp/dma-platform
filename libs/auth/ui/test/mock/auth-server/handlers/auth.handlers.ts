import { delay, http, HttpResponse, RequestHandler } from 'msw';
import { BASE_URL } from '../constants';

export const authHandlers: RequestHandler[] = [
    http.post(`${BASE_URL}/token`, async () => {
        await delay();

        return HttpResponse.json({
            accessToken: 'access-token',
            idToken: 'idToken',
        });
    }),
];
