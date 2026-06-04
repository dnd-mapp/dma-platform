import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { setupTestEnvironment } from '@dnd-mapp/arcane-ui/testing';
import { http, HttpResponse } from 'msw';
import { setupWorker } from 'msw/browser';
import { firstValueFrom } from 'rxjs';
import { RequestService } from './request.service';

interface TestPayload {
    id: number;
    name: string;
}

interface TestBody {
    name: string;
}

describe('RequestService', () => {
    const server = setupWorker();
    const baseUrl = 'https://api.test';

    beforeAll(async () => {
        await server.start({ onUnhandledRequest: 'warn', quiet: true });
    });

    afterEach(() => {
        server.resetHandlers();
    });

    function setupTest() {
        setupTestEnvironment({
            providers: [RequestService, provideHttpClient()],
        });

        return {
            service: TestBed.inject(RequestService),
        };
    }

    it('get returns the parsed response body', async () => {
        const { service } = setupTest();
        const payload: TestPayload = { id: 1, name: 'Alice' };

        server.use(http.get(`${baseUrl}/items`, () => HttpResponse.json(payload)));

        const result = await firstValueFrom(service.get<TestPayload>(`${baseUrl}/items`));

        expect(result).toEqual(payload);
    });

    it('post sends the body and returns the response', async () => {
        const { service } = setupTest();
        const payload: TestPayload = { id: 2, name: 'Bob' };

        server.use(http.post(`${baseUrl}/items`, () => HttpResponse.json(payload)));

        const result = await firstValueFrom(service.post<TestPayload, TestBody>(`${baseUrl}/items`, { name: 'Bob' }));

        expect(result).toEqual(payload);
    });

    it('put sends the body and returns the response', async () => {
        const { service } = setupTest();
        const payload: TestPayload = { id: 1, name: 'Updated' };

        server.use(http.put(`${baseUrl}/items/1`, () => HttpResponse.json(payload)));

        const result = await firstValueFrom(
            service.put<TestPayload, TestBody>(`${baseUrl}/items/1`, { name: 'Updated' }),
        );

        expect(result).toEqual(payload);
    });

    it('patch sends the body and returns the response', async () => {
        const { service } = setupTest();
        const payload: TestPayload = { id: 1, name: 'Patched' };

        server.use(http.patch(`${baseUrl}/items/1`, () => HttpResponse.json(payload)));

        const result = await firstValueFrom(
            service.patch<TestPayload, TestBody>(`${baseUrl}/items/1`, { name: 'Patched' }),
        );

        expect(result).toEqual(payload);
    });

    it('delete hits the correct url and returns the response', async () => {
        const { service } = setupTest();

        server.use(http.delete(`${baseUrl}/items/1`, () => HttpResponse.json(null)));

        const result = await firstValueFrom(service.delete<null>(`${baseUrl}/items/1`));

        expect(result).toBeNull();
    });

    it('propagates a non-2xx response as an error', async () => {
        const { service } = setupTest();

        server.use(http.get(`${baseUrl}/items`, () => new HttpResponse(null, { status: 404 })));

        await expect(firstValueFrom(service.get(`${baseUrl}/items`))).rejects.toThrow('404');
    });
});
