import { ClassConstructor, ClassTransformOptions, plainToInstance } from 'class-transformer';

export const transformOptions = {
    enableCircularCheck: true,
    enableImplicitConversion: true,
} satisfies ClassTransformOptions;

export function transform<T>(ctor: ClassConstructor<T>, value: unknown) {
    return plainToInstance(ctor, value, transformOptions);
}

export function transformAll<T>(ctor: ClassConstructor<T>, value: unknown[]) {
    return plainToInstance(ctor, value, transformOptions);
}
