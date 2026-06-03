import { inject, Injectable } from '@angular/core';
import { STORAGE } from '@dnd-mapp/arcane-ui/common';

@Injectable({ providedIn: null })
export class StorageService {
    private readonly storage = inject(STORAGE);

    public get<T>(key: string): T | null {
        const raw = this.storage.getItem(key);

        if (raw === null) return null;

        try {
            return JSON.parse(raw) as T;
        } catch {
            return null;
        }
    }

    public set<T>(key: string, value: T): void {
        this.storage.setItem(key, JSON.stringify(value));
    }

    public remove(key: string): void {
        this.storage.removeItem(key);
    }
}
