import { UserDto } from './user.dto';

export class UserBuilder {
    private readonly user = new UserDto();

    public build() {
        return this.user;
    }

    public withId(id: string) {
        this.user.id = id;
        return this;
    }

    public withUsername(username: string) {
        this.user.username = username;
        return this;
    }

    public withPassword(password: string) {
        this.user.password = password;
        return this;
    }

    public withEmail(email: string) {
        this.user.email = email;
        return this;
    }

    public withVersion(version: number) {
        this.user.version = version;
        return this;
    }

    public createdAt(timestamp: Date) {
        this.user.createdAt = timestamp;
        return this;
    }

    public lastUpdatedAt(timestamp: Date) {
        this.user.updatedAt = timestamp;
        return this;
    }

    public deletedAt(timestamp: Date | null) {
        this.user.deletedAt = timestamp;
        return this;
    }
}
