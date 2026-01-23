import { Type, ValueProvider } from '@nestjs/common';
import { PrismaClient } from './types';

export const PRISMA_CLIENT_CTOR = 'PRISMA_CLIENT_CTOR' as const;

export function withPrismaClient<T extends PrismaClient>(ctor: Type<T>): ValueProvider {
    return {
        provide: PRISMA_CLIENT_CTOR,
        useValue: ctor,
    };
}
