interface Success<T> {
    data: T;
    error: null;
}

interface Failure<E = Error> {
    data: null;
    error: E;
}

type Result<T, E = Error> = Success<T> | Failure<E>;

export async function tryCatch<T, E = Error>(promise: Promise<T>): Promise<Result<T, E>> {
    try {
        return { data: await promise, error: null };
    } catch (error) {
        return { data: null, error: error as E };
    }
}

export function tryCatchSync<T, E = Error>(fn: () => T): Result<T, E> {
    try {
        return { data: fn(), error: null };
    } catch (error) {
        return { data: null, error: error as E };
    }
}
