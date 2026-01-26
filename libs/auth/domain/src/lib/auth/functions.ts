import { fromRawClientToDto } from '../client';
import { fromRawUserToDto } from '../user';
import { AuthTransactionBuilder } from './auth-transaction.builder';
import type { AuthTransactionDto } from './auth-transaction.dto';

export function fromRawAuthTransactionToDto(raw: AuthTransactionDto) {
    return new AuthTransactionBuilder()
        .withId(raw.id)
        .withNonce(raw.nonce)
        .withState(raw.state)
        .withCodeChallenge(raw.codeChallenge)
        .withRedirectUrl(raw.redirectUrl)
        .withAuthCode(raw.authCode)
        .authCodeExpiresAt(raw.authCodeExpiry)
        .withClient(fromRawClientToDto(raw.client))
        .withUser(raw.user ? fromRawUserToDto(raw.user) : null)
        .build();
}
