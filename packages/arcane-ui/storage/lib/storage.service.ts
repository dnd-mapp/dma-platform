import { inject, Injectable } from '@angular/core';
import { STORAGE } from '@dnd-mapp/arcane-ui/common';

/**
 * Typed wrapper around a {@link Storage} implementation (e.g. `localStorage` or `sessionStorage`).
 *
 * Values are JSON-serialized on write and deserialized on read. Must be provided
 * explicitly via {@link provideStorage} — there is no default storage backend.
 *
 * @example
 * bootstrapApplication(AppComponent, {
 *   providers: [provideStorage(localStorage), StorageService],
 * });
 */
@Injectable({ providedIn: null })
export class StorageService {
    private readonly storage = inject(STORAGE);

    /**
     * Retrieves and deserializes the value stored under `key`.
     *
     * @returns The parsed value, or `null` if the key does not exist or its
     *   value is not valid JSON.
     */
    public get<T>(key: string): T | null {
        const raw = this.storage.getItem(key);

        if (raw === null) return null;

        try {
            return JSON.parse(raw) as T;
        } catch {
            return null;
        }
    }

    /**
     * Serializes `value` as JSON and stores it under `key`, overwriting any
     * existing entry.
     */
    public set<T>(key: string, value: T): void {
        this.storage.setItem(key, JSON.stringify(value));
    }

    /** Removes the entry for `key`. No-op if the key does not exist. */
    public remove(key: string): void {
        this.storage.removeItem(key);
    }
}
