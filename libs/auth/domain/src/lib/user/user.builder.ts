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
}
