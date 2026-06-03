import { TestBed } from '@angular/core/testing';
import { CONFIG_URL } from '@dnd-mapp/arcane-ui/common';
import { setupTestEnvironment } from '@dnd-mapp/arcane-ui/testing';
import { http, HttpResponse } from 'msw';
import { setupWorker } from 'msw/browser';
import { ConfigService } from './config.service';

interface TestConfig {
    apiUrl: string;
    version: number;
}

describe('ConfigService', () => {
    const server = setupWorker();

    beforeAll(async () => {
        await server.start({ onUnhandledRequest: 'warn', quiet: true });
    });

    afterEach(() => {
        server.resetHandlers();
    });

    function setupTest() {
        setupTestEnvironment({
            providers: [ConfigService, { provide: CONFIG_URL, useValue: '/test-config.json' }],
        });

        return { service: TestBed.inject(ConfigService<TestConfig>) };
    }

    it('loads and exposes the config on a successful fetch', async () => {
        const { service } = setupTest();
        const payload: TestConfig = { apiUrl: 'https://api.test', version: 1 };

        server.use(http.get('/test-config.json', () => HttpResponse.json(payload)));

        await service.load();

        expect(service.get()).toEqual(payload);
    });

    it('throws when the response status is not ok', async () => {
        const { service } = setupTest();

        server.use(http.get('/test-config.json', () => new HttpResponse(null, { status: 404 })));

        await expect(service.load()).rejects.toThrow('404');
    });

    it('propagates a network error', async () => {
        const { service } = setupTest();

        server.use(http.get('/test-config.json', () => HttpResponse.error()));

        await expect(service.load()).rejects.toThrow();
    });
});
