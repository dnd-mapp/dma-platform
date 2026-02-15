import { authServerHandlers } from '@dnd-mapp/auth-ui/test';
import { clientHandlers, getMockServiceWorker } from '@dnd-mapp/shared-ui/test';

export async function setupMockHandlers() {
    const msw = getMockServiceWorker();
    msw.resetHandlers(...clientHandlers, ...authServerHandlers);

    await new Promise<void>((resolve) => setTimeout(() => resolve(), 0));
}
