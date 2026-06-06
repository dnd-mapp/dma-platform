import { InjectionToken, type Provider } from '@angular/core';

/**
 * Injection token for the active {@link Storage} implementation.
 *
 * Provide a value with {@link provideStorage}.
 */
export const STORAGE = new InjectionToken<Storage>('STORAGE');

/**
 * Configures the {@link Storage} implementation injected by {@link StorageService}.
 *
 * Can be used at application level in `bootstrapApplication` or overridden at
 * component level via the component's `providers` array.
 *
 * @param storage - The `Storage` instance to use (e.g. `localStorage`, `sessionStorage`,
 *   or a `MockStorage` in tests).
 *
 * @example
 * // Application level
 * bootstrapApplication(AppComponent, {
 *   providers: [provideStorage(localStorage)],
 * });
 *
 * @example
 * // Component level override
 * @Component({ providers: [provideStorage(sessionStorage)] })
 * export class MyComponent {}
 */
export function provideStorage(storage: Storage): Provider[] {
    return [{ provide: STORAGE, useValue: storage }];
}
