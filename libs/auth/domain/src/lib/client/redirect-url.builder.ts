import { RedirectUrlDto } from './redirect-url.dto';

export class RedirectUrlBuilder {
    private redirectUrl = new RedirectUrlDto();

    public build() {
        return this.redirectUrl;
    }

    public withId(id: string) {
        this.redirectUrl.id = id;
        return this;
    }

    public withUrl(url: string) {
        this.redirectUrl.url = url;
        return this;
    }

    public withClientId(clientId: string) {
        this.redirectUrl.clientId = clientId;
        return this;
    }
}
