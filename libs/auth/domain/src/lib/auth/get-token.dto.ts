export const TokenGrantTypes = {
    REFRESH_TOKEN: 'refreshToken',
    AUTH_CODE: 'authCode',
} as const;

export type TokenGrantType = (typeof TokenGrantTypes)[keyof typeof TokenGrantTypes];

export class GetTokenDto {
    public clientId!: string;
    public grantType!: TokenGrantType;
    public authCode?: string;
    public codeVerifier?: string;
}
