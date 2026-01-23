import { IsBase64, IsNotEmpty, IsString } from 'class-validator';

export class AuthorizeQueryParams {
    @IsNotEmpty()
    @IsString()
    public clientId!: string;

    @IsNotEmpty()
    @IsString()
    public redirectUrl!: string;

    @IsNotEmpty()
    @IsString()
    public state!: string;

    @IsNotEmpty()
    @IsString()
    public nonce!: string;

    @IsBase64({ urlSafe: true })
    @IsNotEmpty()
    @IsString()
    public codeChallenge!: string;
}
