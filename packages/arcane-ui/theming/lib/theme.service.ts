import { DOCUMENT } from '@angular/common';
import { inject, Injectable, signal } from '@angular/core';
import { StorageService } from '@dnd-mapp/arcane-ui/storage';
import { isThemeMode, type ThemeMode, ThemeModes } from './theme-mode';

const THEME_STORAGE_KEY = 'theme';

/**
 * Manages the active theme mode for the application, persisting the user's
 * preference to storage across page reloads.
 *
 * Must be provided explicitly — use {@link provideTheme} at application level.
 */
@Injectable({ providedIn: null })
export class ThemeService {
    private readonly document = inject(DOCUMENT);
    private readonly storage = inject(StorageService);

    private readonly _mode = signal<ThemeMode>(ThemeModes.SYSTEM);

    /** The currently active theme mode. */
    public readonly mode = this._mode.asReadonly();

    constructor() {
        this.restorePersistedTheme();
    }

    /**
     * Switches the active theme mode.
     *
     * - `'dark'` / `'light'` — writes `[data-theme]` to `<html>` and persists the preference.
     * - `'system'` — removes `[data-theme]` and clears the stored preference.
     */
    public setTheme(mode: ThemeMode): void {
        this._mode.set(mode);

        if (mode === ThemeModes.SYSTEM) {
            this.storage.remove(THEME_STORAGE_KEY);
        } else {
            this.storage.set(THEME_STORAGE_KEY, mode);
        }
        this.applyTheme(mode);
    }

    private restorePersistedTheme() {
        const stored = this.storage.get<ThemeMode>(THEME_STORAGE_KEY);
        const initial = isThemeMode(stored) ? stored : ThemeModes.SYSTEM;

        this._mode.set(initial);
        this.applyTheme(initial);
    }

    private applyTheme(mode: ThemeMode) {
        if (mode === ThemeModes.SYSTEM) {
            this.document.documentElement.removeAttribute('data-theme');
        } else {
            this.document.documentElement.setAttribute('data-theme', mode);
        }
    }
}
