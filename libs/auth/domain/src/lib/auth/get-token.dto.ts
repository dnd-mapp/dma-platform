export const TokenGrantTypes = {
    REFRESH_TOKEN: 'refreshToken',
    AUTH_CODE: 'authCode',
} as const;

export type TokenGrantType = (typeof TokenGrantTypes)[keyof typeof TokenGrantTypes];

export class GetTokenWithAuthCodeDto {
    public clientId!: string;
    public authCode!: string;
    public codeVerifier!: string;
    public grantType: TokenGrantType = TokenGrantTypes.AUTH_CODE;
}

export class GetTokenWithRefreshTokenDto {
    public clientId!: string;
    public plainToken!: string;
    public grantType: TokenGrantType = TokenGrantTypes.REFRESH_TOKEN;
}

export type GetTokenDto = GetTokenWithAuthCodeDto | GetTokenWithRefreshTokenDto;

export function hasAuthCodeGrant(data: GetTokenDto): data is GetTokenWithAuthCodeDto {
    return data.grantType === TokenGrantTypes.AUTH_CODE;
}
