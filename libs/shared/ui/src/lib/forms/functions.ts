import { ExistingProvider, Type } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

export function provideValueAccessor<T>(component: Type<T>): ExistingProvider {
    return {
        provide: NG_VALUE_ACCESSOR,
        useExisting: component,
        multi: true,
    };
}
