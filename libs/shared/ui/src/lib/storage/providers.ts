import { InjectionToken } from '@angular/core';

export const STORAGE = new InjectionToken('Storage', {
    providedIn: 'root',
    factory: () => sessionStorage,
});
