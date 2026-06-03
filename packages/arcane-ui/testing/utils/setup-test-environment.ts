import { TestBed } from '@angular/core/testing';

export interface SetupTestEnvironmentParams {
    providers?: unknown[];
}

export function setupTestEnvironment(params: SetupTestEnvironmentParams = {}) {
    TestBed.configureTestingModule({
        imports: [],
        providers: [...(params?.providers ?? [])],
    });

    return {};
}
