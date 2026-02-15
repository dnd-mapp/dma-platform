import { Component } from '@angular/core';
import { GameMechanicsHarness } from '@dnd-mapp/dnd-mapp/test';
import { setupTestEnvironment } from '@dnd-mapp/shared-ui/test';
import { GameMechanicsPage } from './game-mechanics.page';

describe('CharactersOverviewPage', () => {
    @Component({
        template: `<dma-game-mechanics />`,
        imports: [GameMechanicsPage],
    })
    class TestComponent {}

    async function setupTest() {
        const { harness } = await setupTestEnvironment({
            testComponent: TestComponent,
            harness: GameMechanicsHarness,
        });

        return {
            harness: harness,
        };
    }

    it('should create', async () => {
        const { harness } = await setupTest();
        expect(harness).toBeDefined();
    });
});
