// organize-imports-ignore
import '@angular/compiler';
import '@analogjs/vitest-angular/setup-snapshots';
import { setupTestBed } from '@analogjs/vitest-angular/setup-testbed';
import { clientHandlers, initializeMockServiceWorker } from '@dnd-mapp/shared-ui/test';
import { authServerHandlers } from './mock';

const { startWorker, stopWorker, resetWorker } = initializeMockServiceWorker(...clientHandlers, ...authServerHandlers);

beforeAll(async () => {
    await startWorker();
});

afterAll(() => {
    stopWorker();
});

afterEach(() => {
    resetWorker();
});

setupTestBed({ browserMode: true, zoneless: true });
