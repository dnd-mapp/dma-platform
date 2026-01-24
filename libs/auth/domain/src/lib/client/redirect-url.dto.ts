import { IsNotEmpty, IsString } from 'class-validator';

export const selectRedirectUrlProperties = {
    id: true,
    url: true,
    clientId: true,
};

export class RedirectUrlDto {
    @IsNotEmpty()
    @IsString()
    public id!: string;

    @IsNotEmpty()
    @IsString()
    public url!: string;

    @IsNotEmpty()
    @IsString()
    public clientId!: string;
}
