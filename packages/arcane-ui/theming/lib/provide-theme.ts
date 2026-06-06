import { type Provider } from '@angular/core';
import { provideStorage } from '@dnd-mapp/arcane-ui/common';
import { StorageService } from '@dnd-mapp/arcane-ui/storage';
import { ThemeService } from './theme.service';

/**
 * Wires up {@link ThemeService} with `localStorage` persistence.
 *
 * @example
 * bootstrapApplication(AppComponent, {
 *   providers: [...provideTheme()],
 * });
 */
export function provideTheme(): Provider[] {
    return [...provideStorage(localStorage), StorageService, ThemeService];
}
