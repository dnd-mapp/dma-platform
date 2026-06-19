interface UnhandledRequestPrint {
    warning(): void;
}

/** Shared MSW browser-worker options for Arcane UI tests. */
export const MSW_START_OPTIONS = {
    quiet: true,
    onUnhandledRequest(request: Request, print: UnhandledRequestPrint): void {
        const pathname = new URL(request.url).pathname;

        if (pathname.includes('virtual:source-map-support')) {
            return;
        }
        print.warning();
    },
};
