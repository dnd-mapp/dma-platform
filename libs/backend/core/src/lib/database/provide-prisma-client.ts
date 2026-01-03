import { ValueProvider } from '@nestjs/common';

export interface Client {
    $connect(): Promise<void>;
    $disconnect(): Promise<void>;
}

export type ClientCtor<T extends Client = Client> = new (...args: unknown[]) => T;

export const PRISMA_CLIENT = 'PRISMA_CLIENT' as const;

export function providePrismaClient(clientCtr: unknown): ValueProvider<unknown> {
    return {
        provide: PRISMA_CLIENT,
        useValue: clientCtr,
    };
}
