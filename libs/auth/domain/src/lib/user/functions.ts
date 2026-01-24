import { UserBuilder } from './user.builder';
import type { UserDto } from './user.dto';

export function fromRawUserToDto(raw: UserDto) {
    return new UserBuilder().withId(raw.id).withUsername(raw.username).withPassword(raw.password).build();
}
