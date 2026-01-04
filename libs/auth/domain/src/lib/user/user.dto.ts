import { Exclude } from 'class-transformer';
import { IsDate, IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UserDto {
    @IsNotEmpty()
    @IsString()
    public id: string;

    @MinLength(3)
    @IsNotEmpty()
    @IsString()
    public username: string;

    @MinLength(12)
    @IsNotEmpty()
    @IsString()
    @Exclude()
    public password: string;

    @IsEmail()
    @IsString()
    public email: string;

    @IsDate()
    public createdAt: Date;

    @IsDate()
    public updatedAt: Date;
}
