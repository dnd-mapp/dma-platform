import { TestBed } from '@angular/core/testing';
import { provideStorage, STORAGE } from '@dnd-mapp/arcane-ui/common';
import { StorageService } from '@dnd-mapp/arcane-ui/storage';
import { MockStorage } from '@dnd-mapp/arcane-ui/storage/testing';
import { setupTestEnvironment } from '@dnd-mapp/arcane-ui/testing';
import { ThemeModes } from './theme-mode';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
    interface SetupTestParams {
        store: Record<string, unknown>;
    }

    async function setupTest(params?: SetupTestParams) {
        const mockStorage = new MockStorage(params?.store ? params.store : {});

        await setupTestEnvironment({
            providers: [...provideStorage(mockStorage), StorageService, ThemeService],
        });

        return {
            service: TestBed.inject(ThemeService),
            mockStorage: TestBed.inject(STORAGE) as MockStorage,
        };
    }

    afterEach(() => document.documentElement.removeAttribute('data-theme'));

    it('initial mode is "system"', async () => {
        const { service } = await setupTest();

        expect(service.mode()).toBe(ThemeModes.SYSTEM);
    });

    it('initial state does not set [data-theme] on <html>', async () => {
        await setupTest();

        expect(document.documentElement.getAttribute('data-theme')).toBeNull();
    });

    it('setTheme("dark") writes [data-theme="dark"] to <html>', async () => {
        const { service } = await setupTest();

        service.setTheme(ThemeModes.DARK);
        expect(document.documentElement.getAttribute('data-theme')).toBe(ThemeModes.DARK);
    });

    it('setTheme("light") writes [data-theme="light"] to <html>', async () => {
        const { service } = await setupTest();

        service.setTheme(ThemeModes.LIGHT);
        expect(document.documentElement.getAttribute('data-theme')).toBe(ThemeModes.LIGHT);
    });

    it('setTheme("system") removes [data-theme] from <html>', async () => {
        const { service } = await setupTest();

        service.setTheme(ThemeModes.DARK);
        service.setTheme(ThemeModes.SYSTEM);
        expect(document.documentElement.getAttribute('data-theme')).toBeNull();
    });

    it('mode signal reflects the active mode after each transition', async () => {
        const { service } = await setupTest();

        service.setTheme(ThemeModes.DARK);
        expect(service.mode()).toBe(ThemeModes.DARK);

        service.setTheme(ThemeModes.LIGHT);
        expect(service.mode()).toBe(ThemeModes.LIGHT);

        service.setTheme(ThemeModes.SYSTEM);
        expect(service.mode()).toBe(ThemeModes.SYSTEM);
    });

    it('switching from light to dark updates [data-theme]', async () => {
        const { service } = await setupTest();

        service.setTheme(ThemeModes.LIGHT);
        service.setTheme(ThemeModes.DARK);
        expect(document.documentElement.getAttribute('data-theme')).toBe(ThemeModes.DARK);
    });

    it('constructor reads a stored "dark" preference', async () => {
        const { service } = await setupTest({ store: { theme: ThemeModes.DARK } });

        expect(service.mode()).toBe(ThemeModes.DARK);
        expect(document.documentElement.getAttribute('data-theme')).toBe(ThemeModes.DARK);
    });

    it('constructor falls back to SYSTEM when nothing is stored', async () => {
        const { service } = await setupTest();

        expect(service.mode()).toBe(ThemeModes.SYSTEM);
    });

    it('constructor falls back to SYSTEM for an invalid stored value', async () => {
        const { service } = await setupTest({ store: { theme: 'not-a-mode' } });

        expect(service.mode()).toBe(ThemeModes.SYSTEM);
    });

    it('setTheme("dark") persists the value to storage', async () => {
        const { service, mockStorage } = await setupTest();

        service.setTheme(ThemeModes.DARK);
        expect(mockStorage.getItem('theme')).toBe('"dark"');
    });

    it('setTheme("system") removes the preference from storage', async () => {
        const { service, mockStorage } = await setupTest();

        service.setTheme(ThemeModes.DARK);
        service.setTheme(ThemeModes.SYSTEM);
        expect(mockStorage.getItem('theme')).toBeNull();
    });
});
