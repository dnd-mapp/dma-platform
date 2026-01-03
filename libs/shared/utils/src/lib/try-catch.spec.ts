import { tryCatch, tryCatchSync } from './try-catch';

describe('tryCatch', () => {
    it('should result in success', async () => {
        const promiseLike = Promise.resolve({ message: 'Hello World' });

        const { data, error } = await tryCatch(promiseLike);

        expect(error).toEqual(null);
        expect(data).toEqual({ message: 'Hello World' });
    });

    it('should result in failure', async () => {
        const promiseLike = Promise.reject(new Error('Unknown failure'));

        const { data, error } = await tryCatch(promiseLike);

        expect(error).toEqual(new Error('Unknown failure'));
        expect(data).toEqual(null);
    });
});

describe('tryCatchSync', () => {
    function myFunction(throwError = false) {
        if (throwError) throw new Error('Unknown failure');
        return { message: 'Hello World' };
    }

    it('should result in success', () => {
        const { data, error } = tryCatchSync(() => myFunction());

        expect(error).toEqual(null);
        expect(data).toEqual({ message: 'Hello World' });
    });

    it('should result in failure', () => {
        const { data, error } = tryCatchSync(() => myFunction(true));

        expect(error).toEqual(new Error('Unknown failure'));
        expect(data).toEqual(null);
    });
});
