import { Component, input } from '@angular/core';
import { NotificationHarness, setupTestEnvironment } from '@dnd-mapp/shared-ui/test';
import { NotificationData, NotificationTypes } from './notification-types';
import { NotificationComponent } from './notification.component';

describe('NotificationComponent', () => {
    @Component({
        template: `<dma-notification [data]="data()" />`,
        imports: [NotificationComponent],
    })
    class TestComponent {
        public readonly data = input<NotificationData>({
            type: NotificationTypes.INFO,
            timestamp: new Date(),
            message: 'This is a notification',
        });
    }

    async function setupTest() {
        const { harness } = await setupTestEnvironment({
            testComponent: TestComponent,
            harness: NotificationHarness,
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
