import { ApplicationInitStatus, Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { LoginHarness } from '@dnd-mapp/auth-client/test';
import { authInterceptor, provideAuthServerService } from '@dnd-mapp/auth-ui';
import { provideHttp, serverErrorInterceptor } from '@dnd-mapp/shared-ui';
import { setupTestEnvironment } from '@dnd-mapp/shared-ui/test';
import { LoginPage } from './login.page';

describe('LoginPage', () => {
    @Component({
        template: `<dma-login />`,
        imports: [LoginPage],
    })
    class TestComponent {}

    async function setupTest() {
        console.log('setupTest');
        const { harness } = await setupTestEnvironment({
            testComponent: TestComponent,
            harness: LoginHarness,
            providers: [
                provideRouter([]),
                provideHttp(serverErrorInterceptor, authInterceptor),
                provideAuthServerService(),
            ],
            afterConfig: async () => {
                console.log('afterConfig');
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
