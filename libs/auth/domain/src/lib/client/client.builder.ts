import { ClientDto } from './client.dto';
import { RedirectUrlDto } from './redirect-url.dto';

export class ClientBuilder {
    private readonly client = new ClientDto();

    public build() {
        return this.client;
    }

    public withId(id: string) {
        this.client.id = id;
        return this;
    }

    public withAudience(audience: string) {
        this.client.audience = audience;
        return this;
    }

    public withRedirectUrls(...urls: RedirectUrlDto[]) {
        this.client.redirectUrls = urls;
        return this;
    }
}
