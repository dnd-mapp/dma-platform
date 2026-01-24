// organize-imports-ignore
import '@angular/compiler';
import '@analogjs/vitest-angular/setup-snapshots';
import { setupTestBed } from '@analogjs/vitest-angular/setup-testbed';
import { initializeMockServiceWorker, clientHandlers } from '@dnd-mapp/shared-ui/test';
import { authServerHandlers } from '@dnd-mapp/auth-ui/test';

const { startWorker, resetWorker, stopWorker } = initializeMockServiceWorker(...clientHandlers, ...authServerHandlers);

beforeAll(async () => {
    await startWorker();
});

beforeEach(() => {
    resetWorker();
});

afterAll(() => {
    stopWorker();
});

setupTestBed({ browserMode: true, zoneless: true });
