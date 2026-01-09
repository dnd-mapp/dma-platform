import { ExistingProvider, Type } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

export function provideValueAccessor<T>(valueAccessor: Type<T>): ExistingProvider {
    return {
        provide: NG_VALUE_ACCESSOR,
        useExisting: valueAccessor,
        multi: true,
    };
}
