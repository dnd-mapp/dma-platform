import { RequestHandler } from 'msw';
import { SetupWorker, setupWorker } from 'msw/browser';

let mockServiceWorker: SetupWorker;

async function startWorker() {
    console.log('startWorker');
    await mockServiceWorker.start({ quiet: true, onUnhandledRequest: 'warn' });
}

function resetWorker() {
    console.log('resetWorker');
    mockServiceWorker.resetHandlers();
}

function stopWorker() {
    console.log('stopWorker');
    mockServiceWorker.stop();
}

export function getMockServiceWorker() {
    return mockServiceWorker;
}

export function initializeMockServiceWorker(...handlers: RequestHandler[]) {
    console.log('initializeMockServiceWorker');
    mockServiceWorker = setupWorker(...handlers);

    return {
        startWorker: startWorker,
        resetWorker: resetWorker,
        stopWorker: stopWorker,
    };
}
