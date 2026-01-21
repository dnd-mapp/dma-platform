import { InjectionToken } from '@angular/core';

export const STORAGE = new InjectionToken('Browser Storage', {
    providedIn: 'root',
    factory: () => sessionStorage,
});
