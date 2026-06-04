import { TestBed } from '@angular/core/testing';
import { provideStorage, STORAGE } from '@dnd-mapp/arcane-ui/common';
import { MockStorage } from '@dnd-mapp/arcane-ui/storage/testing';
import { setupTestEnvironment } from '@dnd-mapp/arcane-ui/testing';
import { StorageService } from './storage.service';

describe('StorageService', () => {
    async function setupTest() {
        await setupTestEnvironment({
            providers: [StorageService, provideStorage(new MockStorage())],
        });

        return {
            service: TestBed.inject(StorageService),
            mockStorage: TestBed.inject(STORAGE),
        };
    }

    it('returns null for a missing key', async () => {
        const { service } = await setupTest();

        expect(service.get('missing')).toBeNull();
    });

    it('round-trips a primitive value', async () => {
        const { service } = await setupTest();

        service.set('num', 42);
        expect(service.get('num')).toBe(42);
    });

    it('round-trips an object value', async () => {
        const { service } = await setupTest();

        service.set('obj', { a: 1, b: 'two' });
        expect(service.get('obj')).toEqual({ a: 1, b: 'two' });
    });

    it('removes a key', async () => {
        const { service } = await setupTest();

        service.set('key', 'value');
        service.remove('key');
        expect(service.get('key')).toBeNull();
    });

    it('overwriting a key reflects the new value', async () => {
        const { service } = await setupTest();

        service.set('key', 'first');
        service.set('key', 'second');
        expect(service.get('key')).toBe('second');
    });

    it('returns null when the stored value is not valid JSON', async () => {
        const { service, mockStorage } = await setupTest();

        mockStorage.setItem('key', 'not valid json {');
        expect(service.get('key')).toBeNull();
    });
});
