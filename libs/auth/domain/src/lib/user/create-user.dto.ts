import { UserDto } from '@dnd-mapp/domain/auth';
import { PickType } from '@nestjs/mapped-types';

export class CreateUserDto extends PickType(UserDto, ['username', 'password', 'email'] as const) {}
