import { InjectionToken } from '@angular/core';

/**
 * Injection token for the URL that {@link ConfigService} fetches at bootstrap.
 *
 * Provide a value with {@link provideConfig}.
 */
export const CONFIG_URL = new InjectionToken<string>('CONFIG_URL');
