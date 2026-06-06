import { RootHarness } from '@/core/test/harnesses/root';
import { Component } from '@angular/core';
import { provideRouter } from '@angular/router';
import { setupTestEnvironment } from '@dnd-mapp/arcane-ui/testing';
import { RootComponent } from './root.component';

describe('RootComponent', () => {
    @Component({
        selector: 'dma-test',
        template: `<dma-root />`,
        imports: [RootComponent],
    })
    class TestComponent {}

    async function setupTest() {
        const { harness } = await setupTestEnvironment({
            testComponent: TestComponent,
            harness: RootHarness,
            providers: [provideRouter([])],
        });

        return {
            harness: harness!,
        };
    }

    it('should render the text', async () => {
        const { harness } = await setupTest();
        expect(await harness.paragraphContents()).toEqual('root works!');
    });
});
