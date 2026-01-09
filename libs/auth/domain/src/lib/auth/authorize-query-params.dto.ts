import { IsBase64 } from 'class-validator';

export class AuthorizeQueryParamsDto {
    @IsBase64({ urlSafe: true })
    public state: string;

    @IsBase64()
    public codeChallenge: string;
}
