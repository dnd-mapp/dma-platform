import { RedirectUrlDto, selectRedirectUrlProperties } from './redirect-url.dto';

export const selectClientProperties = {
    id: true,
    audience: true,
    redirectUrls: {
        select: selectRedirectUrlProperties,
    },
};

export class ClientDto {
    public id!: string;
    public audience!: string;
    public redirectUrls!: RedirectUrlDto[];
}
