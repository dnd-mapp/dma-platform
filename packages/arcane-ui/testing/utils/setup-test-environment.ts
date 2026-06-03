import { TestBed } from '@angular/core/testing';

/** Parameters accepted by {@link setupTestEnvironment}. */
export interface SetupTestEnvironmentParams {
    providers?: unknown[];
}

/**
 * Configures a `TestBed` environment for a single test or `describe` block.
 *
 * @param params - Optional configuration. Pass `providers` to register services,
 *   tokens, or other providers for the test.
 */
export function setupTestEnvironment(params: SetupTestEnvironmentParams = {}) {
    TestBed.configureTestingModule({
        imports: [],
        providers: [...(params?.providers ?? [])],
    });

    return {};
}
