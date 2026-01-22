import { Test } from '@nestjs/testing';
import { AuthController } from './auth.controller';

describe('AuthController', () => {
    async function setupTest() {
        const module = await Test.createTestingModule({
            controllers: [AuthController],
        }).compile();

        return {
            controller: module.get(AuthController),
        };
    }

    it('should create', async () => {
        const { controller } = await setupTest();
        expect(controller).toBeDefined();
    });
});
