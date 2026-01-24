import { ClientBuilder } from './client.builder';
import type { ClientDto } from './client.dto';
import { RedirectUrlBuilder } from './redirect-url.builder';
import type { RedirectUrlDto } from './redirect-url.dto';

export function isRedirectUrlValid(redirectUrls: RedirectUrlDto[], url: string) {
    return redirectUrls.some((redirectUrl) => redirectUrl.url === url);
}

export function fromRawRedirectUrlToDto(raw: RedirectUrlDto) {
    return new RedirectUrlBuilder().withId(raw.id).withUrl(raw.url).withClientId(raw.clientId).build();
}

export function fromAllRawRedirectUrlsToDto(raw: RedirectUrlDto[]) {
    return raw.map((rawEntry) => fromRawRedirectUrlToDto(rawEntry));
}

export function fromRawClientToDto(raw: ClientDto) {
    return new ClientBuilder()
        .withId(raw.id)
        .withAudience(raw.audience)
        .withRedirectUrls(...fromAllRawRedirectUrlsToDto(raw.redirectUrls))
        .build();
}
