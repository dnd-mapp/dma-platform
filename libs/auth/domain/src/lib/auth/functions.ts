import { AuthTransactionBuilder } from '@dnd-mapp/auth-domain';
import { fromRawClientToDto } from '../client/functions';
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
        .build();
}
