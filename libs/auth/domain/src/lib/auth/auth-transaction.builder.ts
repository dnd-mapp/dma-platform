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

    public withClientId(clientId: string) {
        this.authTransaction.clientId = clientId;
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
}
