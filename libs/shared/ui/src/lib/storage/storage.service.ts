import { inject, Injectable } from '@angular/core';
import { tryCatchSync } from '@dnd-mapp/shared/utils';
import { STORAGE } from './providers';
import { StorageKey } from './storage-keys';

@Injectable({ providedIn: 'root' })
export class StorageService {
    private readonly storage = inject(STORAGE);

    public getItem<T>(key: StorageKey) {
        const value = this.storage.getItem(key);

        if (!value) return null;
        const { data, error } = tryCatchSync(() => JSON.parse(value));

        if (error) {
            this.storage.removeItem(key);
            throw error;
        }
        return data as T;
    }

    public setItem(key: StorageKey, value: string) {
        this.storage.setItem(key, value);
    }

    public removeItem(key: StorageKey) {
        this.storage.removeItem(key);
    }

    public clear() {
        this.storage.clear();
    }
}
