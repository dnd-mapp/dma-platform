import { http, HttpResponse, RequestHandler } from 'msw';

export const clientHandlers: RequestHandler[] = [
    http.get('/config.json', () => {
        return HttpResponse.json({
            clientId: 'client-id',
            authServerBaseUrl: 'https://localhost.auth.dndmapp.dev:4350',
        });
    }),
];
