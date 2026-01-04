import { UserDto } from '../../../src';
import { MockDbRecords } from './mock-db-records';

class MockUserDB {
    private records: MockDbRecords<UserDto> = {};

    public getAll() {
        return Object.values(this.records);
    }

    public reset() {
        this.records = {};
    }
}

export const mockUserDB = new MockUserDB();
