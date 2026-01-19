import { ComponentHarness, HarnessQuery } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';

interface SetupTestEnvironmentParams<Harness extends ComponentHarness, Component = unknown> {
    testComponent: Type<Component>;
    harness: HarnessQuery<Harness>;
}

export async function setupTestEnvironment<Harness extends ComponentHarness, Component = unknown>(
    params: SetupTestEnvironmentParams<Harness, Component>,
) {
    TestBed.configureTestingModule({
        imports: [params.testComponent],
    });

    const harnessLoader = TestbedHarnessEnvironment.loader(TestBed.createComponent(params.testComponent));

    return {
        harness: await harnessLoader.getHarness(params.harness),
    };
}
