import { ClientDto } from '../client';
import { UserDto } from '../user';
import { AuthTransactionDto } from './auth-transaction.dto';

export class AuthTransactionBuilder {
    private readonly authTransaction = new AuthTransactionDto();

    public build() {
        return this.authTransaction;
    }

    public withId(id: string) {
        this.authTransaction.id = id;
        return this;
    }

    public withNonce(nonce: string) {
        this.authTransaction.nonce = nonce;
        return this;
    }

    public withState(state: string) {
        this.authTransaction.state = state;
        return this;
    }

    public withCodeChallenge(codeChallenge: string) {
        this.authTransaction.codeChallenge = codeChallenge;
        return this;
    }

    public withRedirectUrl(redirectUrl: string) {
        this.authTransaction.redirectUrl = redirectUrl;
        return this;
    }

    public withUser(user: UserDto | null) {
        this.authTransaction.user = user;
        return this;
    }

    public withClient(client: ClientDto) {
        this.authTransaction.client = client;
        return this;
    }

    public withAuthCode(authCode: string | null) {
        this.authTransaction.authCode = authCode;
        return this;
    }

    public authCodeExpiresAt(timestamp: Date | null) {
        this.authTransaction.authCodeExpiry = timestamp;
        return this;
    }
}
