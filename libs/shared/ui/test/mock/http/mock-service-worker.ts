import { RequestHandler } from 'msw';
import { SetupWorker, setupWorker } from 'msw/browser';

let mockServiceWorker: SetupWorker;

async function startWorker() {
    await mockServiceWorker.start({ quiet: true, onUnhandledRequest: 'warn' });
}

function resetWorker() {
    mockServiceWorker.resetHandlers();
}

function stopWorker() {
    mockServiceWorker.stop();
}

export function getMockServiceWorker() {
    return mockServiceWorker;
}

export function initializeMockServiceWorker(...handlers: RequestHandler[]) {
    mockServiceWorker = setupWorker(...handlers);

    return {
        startWorker: startWorker,
        resetWorker: resetWorker,
        stopWorker: stopWorker,
    };
}
