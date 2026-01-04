import { mockUserDB } from '@dnd-mapp/domain/auth/test';
import { Provider } from '@nestjs/common';
import { DatabaseService } from '../../src';

const mockUser = {
    findMany: async () => Promise.resolve(mockUserDB.getAll()),
};

const mockPrisma = {
    user: mockUser,
};

const mockDatabaseService = {
    prisma: mockPrisma,
};

export function provideMockDatabase(): Provider {
    return {
        provide: DatabaseService,
        useValue: mockDatabaseService,
    };
}
