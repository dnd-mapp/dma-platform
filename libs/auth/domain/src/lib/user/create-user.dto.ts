import { UserDto } from '@dnd-mapp/domain/auth';
import { PickType } from '@nestjs/mapped-types';

export const userProperties: (keyof UserDto)[] = ['username', 'password', 'email'] as const;

export class CreateUserDto extends PickType(UserDto, userProperties) {}
