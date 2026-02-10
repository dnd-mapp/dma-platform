import { provideHttpClient, withFetch } from '@angular/common/http';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { LoginHarness } from '@dnd-mapp/auth-client/test';
import { ConfigService } from '@dnd-mapp/shared-ui';
import { setupTestEnvironment } from '@dnd-mapp/shared-ui/test';
import { lastValueFrom } from 'rxjs';
import { LoginPage } from './login.page';

describe('LoginPage', () => {
    @Component({
        template: `<dma-login />`,
        imports: [LoginPage],
    })
    class TestComponent {}

    async function setupTest() {
        const { harness } = await setupTestEnvironment({
            testComponent: TestComponent,
            harness: LoginHarness,
            providers: [provideRouter([]), provideHttpClient(withFetch())],
            afterConfig: async () => {
                const configService = TestBed.inject(ConfigService);
                await lastValueFrom(configService.initialize());
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
