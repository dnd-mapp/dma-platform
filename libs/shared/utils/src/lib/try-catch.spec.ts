import { tryCatch, tryCatchSync } from './try-catch';

describe('tryCatch', () => {
    it('should return data', async () => {
        const { data, error } = await tryCatch(Promise.resolve({ message: 'Hello world' }));

        expect(data).toEqual({ message: 'Hello world' });
        expect(error).toEqual(null);
    });

    it('should return error', async () => {
        const { data, error } = await tryCatch(
            new Promise(() => {
                throw new Error('Unexpected error');
            }),
        );

        expect(data).toEqual(null);
        expect(error).toEqual(new Error('Unexpected error'));
    });
});

describe('tryCatchSync', () => {
    it('should return data', () => {
        const { data, error } = tryCatchSync(() => ({ message: 'Hello world' }));

        expect(data).toEqual({ message: 'Hello world' });
        expect(error).toEqual(null);
    });

    it('should return error', () => {
        const { data, error } = tryCatchSync(() => {
            throw new Error('Unexpected error');
        });

        expect(data).toEqual(null);
        expect(error).toEqual(new Error('Unexpected error'));
    });
});
