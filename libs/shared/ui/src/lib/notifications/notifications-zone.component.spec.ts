import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NotificationsZoneHarness, setupTestEnvironment } from '@dnd-mapp/shared-ui/test';
import { NotificationService } from './notification.service';
import { NotificationsZoneComponent } from './notifications-zone.component';

describe('NotificationsZoneComponent', () => {
    @Component({
        template: `<dma-notifications-zone />`,
        imports: [NotificationsZoneComponent],
    })
    class TestComponent {}

    async function setupTest() {
        const { harness } = await setupTestEnvironment({
            testComponent: TestComponent,
            harness: NotificationsZoneHarness,
        });

        return {
            harness: harness,
            service: TestBed.inject(NotificationService),
        };
    }

    it('should create', async () => {
        const { harness } = await setupTest();
        expect(harness).toBeDefined();
    });
});
