import { ComponentHarness, HarnessLoader, HarnessQuery } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

interface SetupTestEnvironmentParams<H extends ComponentHarness, C = unknown> {
    testComponent?: Type<C>;
    harness?: HarnessQuery<H>;
    imports?: unknown[];
    providers?: unknown[];
}

export async function setupTestEnvironment<H extends ComponentHarness, C = unknown>(
    params?: SetupTestEnvironmentParams<H, C>,
) {
    TestBed.configureTestingModule({
        imports: [...(params?.imports ?? []), ...(params?.testComponent ? [params.testComponent] : [])],
        providers: [...(params?.providers ?? [])],
    });

    let fixture: ComponentFixture<C> | null = null;
    let harnessLoader: HarnessLoader | null = null;
    let harness: H | null = null;

    if (params?.testComponent) {
        fixture = TestBed.createComponent(params.testComponent);
        harnessLoader = TestbedHarnessEnvironment.loader(fixture);
    }
    if (params?.harness && harnessLoader) {
        harness = await harnessLoader.getHarness(params.harness);
    }
    return {
        ...(fixture ? { fixture: fixture, component: fixture.componentInstance } : {}),
        ...(harnessLoader ? { harnessLoader: harnessLoader } : {}),
        ...(harness ? { harness: harness } : {}),
    };
}
