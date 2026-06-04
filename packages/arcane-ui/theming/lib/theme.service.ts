import { DOCUMENT } from '@angular/common';
import { inject, Injectable, signal } from '@angular/core';
import { type ThemeMode, ThemeModes } from './theme-mode';

/**
 * Manages the active theme mode for the application.
 *
 * Must be provided explicitly — there is no default provider.
 *
 * @example
 * bootstrapApplication(AppComponent, {
 *   providers: [ThemeService],
 * });
 */
@Injectable({ providedIn: null })
export class ThemeService {
    private readonly document = inject(DOCUMENT);

    private readonly _mode = signal<ThemeMode>(ThemeModes.SYSTEM);

    /** The currently active theme mode. Reflects the last value passed to {@link setTheme}, or `'system'` before any call. */
    public readonly mode = this._mode.asReadonly();

    constructor() {
        this.applyTheme(ThemeModes.SYSTEM);
    }

    /**
     * Switches the active theme mode.
     *
     * - `'dark'` / `'light'` — writes `[data-theme]` to `<html>`, overriding the CSS media query.
     * - `'system'` — removes `[data-theme]`, letting `prefers-color-scheme` govern via the media query.
     */
    public setTheme(mode: ThemeMode): void {
        this._mode.set(mode);
        this.applyTheme(mode);
    }

    private applyTheme(mode: ThemeMode) {
        if (mode === ThemeModes.SYSTEM) {
            this.document.documentElement.removeAttribute('data-theme');
        } else {
            this.document.documentElement.setAttribute('data-theme', mode);
        }
    }
}
