import { inject, Injectable } from '@angular/core';
import { tryCatchSync } from '@dnd-mapp/shared-utils';
import { StorageKey } from './storage-keys';
import { STORAGE } from './storage-provider';

@Injectable({ providedIn: 'root' })
export class StorageService {
    private readonly storage = inject(STORAGE);

    public getItem<T>(key: StorageKey) {
        const rawValue = this.storage.getItem(key);

        if (rawValue === null) return null;
        const { data, error } = tryCatchSync(() => JSON.parse(rawValue));

        if (error) {
            this.removeItem(key);
            throw error;
        }
        return data as T;
    }

    public setItem<T>(key: StorageKey, value: T) {
        this.storage.setItem(key, JSON.stringify(value));
    }

    public removeItem(key: StorageKey) {
        this.storage.removeItem(key);
    }

    public clear() {
        this.storage.clear();
    }
}
