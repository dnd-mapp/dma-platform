import { MSW_START_OPTIONS } from './msw-start-options';

describe('MSW_START_OPTIONS', () => {
    it('bypasses Vite source-map support requests', () => {
        const warning = vi.fn();
        const request = new Request(
            'http://localhost:51204/@fs/D:/workspace/virtual:source-map-support?import&browser=123',
        );

        MSW_START_OPTIONS.onUnhandledRequest(request, { warning });

        expect(warning).not.toHaveBeenCalled();
    });

    it('warns about other unhandled requests', () => {
        const warning = vi.fn();
        const request = new Request('https://api.test/unhandled');

        MSW_START_OPTIONS.onUnhandledRequest(request, { warning });

        expect(warning).toHaveBeenCalledOnce();
    });
});
