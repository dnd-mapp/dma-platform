import { Component } from '@angular/core';
import { ButtonHarness } from '@dnd-mapp/arcane-ui/components/testing';
import { setupTestEnvironment } from '@dnd-mapp/arcane-ui/testing';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
    @Component({
        selector: 'dma-test',
        template: '<button type="button" dma-button>Click</button>',
        imports: [ButtonComponent],
    })
    class TestComponent {}

    async function setupTest() {
        const { harness } = await setupTestEnvironment({
            testComponent: TestComponent,
            harness: ButtonHarness,
        });

        return {
            harness: harness,
        };
    }

    it('can be located via its harness', async () => {
        const { harness } = await setupTest();
        expect(harness).toBeDefined();
    });
});
