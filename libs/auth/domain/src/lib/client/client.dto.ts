import { RedirectUrlDto } from './redirect-url.dto';

export class ClientDto {
    public id!: string;
    public audience!: string;
    public redirectUrls!: RedirectUrlDto[];

    public isRedirectUrlValid(url: string) {
        return this.redirectUrls.some((redirectUrl) => redirectUrl.url === url);
    }
}
