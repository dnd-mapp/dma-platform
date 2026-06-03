/**
 * In-memory implementation of the {@link Storage} interface for use in unit tests.
 *
 * Pass an instance to {@link provideStorage} to isolate tests from the real browser storage.
 *
 * @example
 * TestBed.configureTestingModule({
 *   providers: [StorageService, provideStorage(new MockStorage())],
 * });
 */
export class MockStorage implements Storage {
    private store: Record<string, string> = {};

    public get length(): number {
        return Object.keys(this.store).length;
    }

    public clear(): void {
        this.store = {};
    }

    public getItem(key: string): string | null {
        return this.store[key] ?? null;
    }

    public key(index: number): string | null {
        return Object.keys(this.store)[index] ?? null;
    }

    public removeItem(key: string): void {
        delete this.store[key];
    }

    public setItem(key: string, value: string): void {
        this.store[key] = value;
    }
}
