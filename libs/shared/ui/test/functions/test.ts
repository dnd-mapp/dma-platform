import { getMockServiceWorker, initializeMockServiceWorker } from '@dnd-mapp/shared-ui/test';

export const test = it.extend({
    worker: [
        // eslint-disable-next-line no-empty-pattern
        async ({}, use) => {
            const { startWorker, resetWorker, stopWorker } = initializeMockServiceWorker();

            await startWorker();

            await use(getMockServiceWorker());

            resetWorker();
            stopWorker();
        },
        {
            auto: true,
        },
    ],
});
