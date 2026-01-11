import { IsBase64, IsNotEmpty, IsString } from 'class-validator';

export class AuthorizeQueryParamsDto {
    @IsBase64({ urlSafe: true })
    public state: string;

    @IsNotEmpty()
    @IsString()
    public nonce: string;

    @IsBase64()
    public codeChallenge: string;
}
