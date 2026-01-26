import { inject, Injectable, signal } from '@angular/core';
import { type GetTokenDto, type LoginDto, TokenGrantType, TokenGrantTypes } from '@dnd-mapp/auth-domain';
import { base64, ConfigService, sha256, StorageKeys, StorageService, TEXT_ENCODER } from '@dnd-mapp/shared-ui';
import { nanoid } from 'nanoid';
import { from, map, tap } from 'rxjs';
import { AuthServerService } from './auth-server.service';

interface GetTokenParams {
    state: string;
    authCode: string;
    grantType: TokenGrantType;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    private readonly textEncoder = inject(TEXT_ENCODER);
    private readonly storageService = inject(StorageService);
    private readonly configService = inject(ConfigService);
    private readonly authServerService = inject(AuthServerService);

    public readonly authenticated = signal(false);

    public authorize() {
        const codeVerifier = this.generateCodeVerifier();
        const state = nanoid();
        const nonce = nanoid();
        const clientId = this.configService.config.clientId;
        const redirectUrl = location.href;

        if (!clientId) throw new Error('clientId is required');
        this.storageService.setItem(StorageKeys.CODE_VERIFIER, codeVerifier);
        this.storageService.setItem(StorageKeys.AUTH_STATE, state);
        this.storageService.setItem(StorageKeys.ID_NONCE, nonce);

        return this.generateCodeChallenge(codeVerifier).pipe(
            tap((codeChallenge) =>
                this.authServerService.authorize({
                    clientId: clientId,
                    redirectUrl: redirectUrl,
                    codeChallenge: codeChallenge,
                    state: state,
                    nonce: nonce,
                }),
            ),
        );
    }

    public login(data: LoginDto) {
        return this.authServerService.login(data);
    }

    public token(params: GetTokenParams) {
        const storedState = this.storageService.getItem<string>(StorageKeys.AUTH_STATE);

        if (storedState === null) {
            throw new Error('No state found in stored.');
        } else {
            if (storedState !== params.state) {
                throw new Error('Invalid state found for authorization.');
            }
        }
        const clientId = this.configService.config.clientId;

        if (!clientId) {
            throw new Error('ClientId is required');
        }
        const data: GetTokenDto = { clientId: clientId, grantType: params.grantType, authCode: params.authCode };

        if (data.grantType === TokenGrantTypes.AUTH_CODE) {
            const codeVerifier = this.storageService.getItem<string>(StorageKeys.CODE_VERIFIER);

            if (!codeVerifier) {
                throw new Error('Code verifier is required');
            }
            data.codeVerifier = codeVerifier;
        }
        return this.authServerService.token(data);
    }

    private generateCodeVerifier() {
        return base64(nanoid(), this.textEncoder);
    }

    private generateCodeChallenge(codeVerifier: string) {
        return from(sha256(codeVerifier, this.textEncoder)).pipe(
            map((hashBuffer) => base64(new Uint8Array(hashBuffer))),
        );
    }
}
