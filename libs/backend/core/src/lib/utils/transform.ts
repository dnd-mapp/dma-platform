import { ClassConstructor, ClassTransformOptions, plainToInstance } from 'class-transformer';

const transformOptions: ClassTransformOptions = {
    enableCircularCheck: true,
    enableImplicitConversion: true,
    exposeDefaultValues: true,
};

export function transform<T>(ctor: ClassConstructor<T>, value: unknown) {
    return plainToInstance(ctor, value, transformOptions);
}

export function transformAll<T>(ctor: ClassConstructor<T>, values: unknown[]) {
    return plainToInstance(ctor, values, transformOptions);
}
