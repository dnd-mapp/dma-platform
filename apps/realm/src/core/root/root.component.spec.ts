import { RootHarness } from '@/core/test/harnesses/root';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RootComponent } from './root.component';

describe('RootComponent', () => {
    @Component({
        selector: 'dma-test',
        imports: [RootComponent],
        template: `<dma-root />`,
    })
    class TestComponent {}

    async function setupTest() {
        const fixture = TestBed.configureTestingModule({
            imports: [TestComponent],
        }).createComponent(TestComponent);

        const harnessLoader = TestbedHarnessEnvironment.loader(fixture);

        return {
            harness: await harnessLoader.getHarness(RootHarness),
        };
    }

    it('should render the text', async () => {
        const { harness } = await setupTest();
        expect(await harness.paragraphContents()).toEqual('root works!');
    });
});
