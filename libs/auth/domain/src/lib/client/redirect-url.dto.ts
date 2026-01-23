import { IsNotEmpty, IsString } from 'class-validator';

export class RedirectUrlDto {
    @IsNotEmpty()
    @IsString()
    public id!: string;

    @IsNotEmpty()
    @IsString()
    public url!: string;
}
