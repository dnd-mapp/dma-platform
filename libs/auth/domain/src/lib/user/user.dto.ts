import { Exclude } from 'class-transformer';
import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsString, Min, MinLength } from 'class-validator';

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

    @Min(1)
    @IsNumber({ maxDecimalPlaces: 0, allowInfinity: false, allowNaN: false })
    public version: number;

    @IsDate()
    public createdAt: Date;

    @IsDate()
    public updatedAt: Date;

    @IsDate()
    public deletedAt: Date | null;
}
