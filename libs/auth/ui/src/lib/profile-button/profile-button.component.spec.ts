import { ApplicationInitStatus, Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ProfileButtonHarness, setupMockHandlers } from '@dnd-mapp/auth-ui/test';
import { provideHttp, serverErrorInterceptor } from '@dnd-mapp/shared-ui';
import { setupTestEnvironment } from '@dnd-mapp/shared-ui/test';
import { authInterceptor, provideAuthServerService } from '../http';
import { ProfileButtonComponent } from './profile-button.component';

describe('ProfileButtonComponent', () => {
    @Component({
        template: `<dma-profile-button />`,
        imports: [ProfileButtonComponent],
    })
    class TestComponent {}

    async function setupTest() {
        await setupMockHandlers();

        const { harness } = await setupTestEnvironment({
            testComponent: TestComponent,
            harness: ProfileButtonHarness,
            providers: [provideHttp(serverErrorInterceptor, authInterceptor), provideAuthServerService()],
            afterConfig: async () => {
                await TestBed.inject(ApplicationInitStatus).donePromise;
            },
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
