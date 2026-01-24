import { ClientDto, selectClientProperties } from '../client';

export const selectAuthTransactionProperties = {
    id: true,
    nonce: true,
    state: true,
    codeChallenge: true,
    redirectUrl: true,
    authCode: true,
    authCodeExpiry: true,
    client: {
        select: selectClientProperties,
    },
};

export class AuthTransactionDto {
    public id!: string;
    public nonce!: string;
    public state!: string;
    public codeChallenge!: string;
    public redirectUrl!: string;
    public authCode: string | null = null;
    public authCodeExpiry: Date | null = null;
    public client!: ClientDto;
}
