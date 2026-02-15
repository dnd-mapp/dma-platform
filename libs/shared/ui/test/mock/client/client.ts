import { delay, http, HttpResponse, RequestHandler } from 'msw';

export const clientHandlers: RequestHandler[] = [
    http.get('/config.json', async () => {
        console.log('GET /config.json');
        await delay();
        return HttpResponse.json({
            clientId: 'client-id',
            authServerBaseUrl: 'https://localhost.auth.dndmapp.dev:4350',
        });
    }),
];
