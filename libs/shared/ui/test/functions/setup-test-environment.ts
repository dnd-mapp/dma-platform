import { ComponentHarness, HarnessLoader, HarnessQuery } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

interface SetupTestEnvironmentParams<Harness extends ComponentHarness, Component = unknown> {
    testComponent?: Type<Component>;
    harness?: HarnessQuery<Harness>;
    providers?: unknown[];
    afterConfig?: () => void | Promise<void>;
}

export async function setupTestEnvironment<Harness extends ComponentHarness, Component = unknown>(
    params: SetupTestEnvironmentParams<Harness, Component> = {},
) {
    console.log('setupTestEnvironment');
    const { providers, testComponent, harness } = params;

    TestBed.configureTestingModule({
        imports: [...(testComponent ? [testComponent] : [])],
        providers: [...(providers ? providers : [])],
    });

    let fixture: ComponentFixture<Component> | undefined;
    let harnessLoader: HarnessLoader | undefined;

    if (params.afterConfig) {
        const promise = params.afterConfig();
        if (promise instanceof Promise) await promise;
    }
    if (testComponent) {
        fixture = TestBed.createComponent(testComponent);
        harnessLoader = TestbedHarnessEnvironment.loader(fixture);
    }
    return {
        ...(fixture ? { fixture: fixture, component: fixture.componentInstance, harnessLoader: harnessLoader } : {}),
        ...(harness && harnessLoader ? { harness: await harnessLoader.getHarness(harness) } : {}),
    };
}
