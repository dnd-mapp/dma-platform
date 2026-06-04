import { TestBed } from '@angular/core/testing';
import { setupTestEnvironment } from '@dnd-mapp/arcane-ui/testing';
import { ThemeModes } from './theme-mode';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
    async function setupTest() {
        await setupTestEnvironment({ providers: [ThemeService] });
        return { service: TestBed.inject(ThemeService) };
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
});
