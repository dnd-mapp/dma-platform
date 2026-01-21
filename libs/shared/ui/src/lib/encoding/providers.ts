import { InjectionToken } from '@angular/core';

export const TEXT_ENCODER = new InjectionToken('Text encoder', {
    providedIn: 'root',
    factory: () => new TextEncoder(),
});
