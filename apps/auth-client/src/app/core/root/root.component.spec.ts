import { provideHttpClient, withFetch } from '@angular/common/http';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RootHarness } from '@dnd-mapp/auth-client/test';
import { ConfigService } from '@dnd-mapp/shared-ui';
import { setupTestEnvironment } from '@dnd-mapp/shared-ui/test';
import { lastValueFrom } from 'rxjs';
import { appRoutes } from '../config';
import { RootComponent } from './root.component';

describe('RootComponent', () => {
    @Component({
        template: `<dma-root />`,
        imports: [RootComponent],
    })
    class TestComponent {}

    async function setupTest() {
        const { harness } = await setupTestEnvironment({
            testComponent: TestComponent,
            harness: RootHarness,
            providers: [provideRouter(appRoutes), provideHttpClient(withFetch())],
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
