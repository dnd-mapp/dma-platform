import { provideMockDatabase } from '@dnd-mapp/backend/core/test';
import { Test } from '@nestjs/testing';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

describe('UserService', () => {
    async function setupTest() {
        const module = await Test.createTestingModule({
            providers: [UserService, UserRepository, provideMockDatabase()],
        }).compile();

        return {
            service: module.get(UserService),
        };
    }

    it('should return all users', async () => {
        const { service } = await setupTest();

        expect(await service.getAll()).toEqual([]);
    });
});
