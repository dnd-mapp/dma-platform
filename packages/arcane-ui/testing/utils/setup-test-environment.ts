import { ComponentHarness, type HarnessLoader, type HarnessQuery } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { provideZonelessChangeDetection, Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

/** Parameters accepted by {@link setupTestEnvironment}. */
export interface SetupTestEnvironmentParams<T, H extends ComponentHarness> {
    /** Standalone components or modules to import into the test module. */
    imports?: unknown[];
    /** Services, tokens, or other providers. {@link provideZonelessChangeDetection} is always included. */
    providers?: unknown[];
    /** Host component to create a fixture for. Required to use `harness`. */
    testComponent?: Type<T>;
    /** Harness query resolved from the fixture's harness loader. Requires `testComponent`. */
    harness?: HarnessQuery<H>;
}

/**
 * Configures a `TestBed` environment with zoneless change detection for a single test or `describe` block.
 *
 * When `testComponent` is provided the return value includes `fixture` and `harnessLoader`.
 * When `harness` is also provided the return value additionally includes the resolved harness instance.
 *
 * @param params - Optional configuration — see {@link SetupTestEnvironmentParams}.
 */
export async function setupTestEnvironment<T, H extends ComponentHarness>(
    params: SetupTestEnvironmentParams<T, H> = {},
) {
    TestBed.configureTestingModule({
        imports: [...(params?.imports ?? []), ...(params?.testComponent ? [params.testComponent] : [])],
        providers: [provideZonelessChangeDetection(), ...(params?.providers ?? [])],
    });

    let fixture: ComponentFixture<T> | undefined;
    let harnessLoader: HarnessLoader | undefined;

    if (params.testComponent) {
        fixture = TestBed.createComponent(params.testComponent);
        harnessLoader = TestbedHarnessEnvironment.loader(fixture);
    }
    return {
        ...(fixture ? { fixture: fixture, harnessLoader: harnessLoader! } : {}),
        ...(params.harness ? { harness: await harnessLoader!.getHarness(params.harness) } : {}),
    };
}
