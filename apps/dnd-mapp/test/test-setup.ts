// organize-imports-ignore
import '@angular/compiler';
import '@analogjs/vitest-angular/setup-snapshots';
import { setupTestBed } from '@analogjs/vitest-angular/setup-testbed';
import { initializeMockServiceWorker, clientHandlers } from '@dnd-mapp/shared-ui/test';
import { authServerHandlers } from '@dnd-mapp/auth-ui/test';

setupTestBed({ browserMode: true, zoneless: true });

const { startWorker, resetWorker, stopWorker } = initializeMockServiceWorker(...clientHandlers, ...authServerHandlers);

beforeAll(async () => {
    console.log('beforeAll');
    await startWorker();
});

beforeEach(() => {
    console.log('beforeEach');
    resetWorker();
});

afterAll(() => {
    console.log('afterAll');
    stopWorker();
});
