import { InjectionToken, type Provider } from '@angular/core';

export const STORAGE = new InjectionToken<Storage>('STORAGE');

export function provideStorage(storage: Storage): Provider[] {
    return [{ provide: STORAGE, useValue: storage }];
}
