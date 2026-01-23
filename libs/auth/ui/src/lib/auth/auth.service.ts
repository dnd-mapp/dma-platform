import { inject, Injectable, signal } from '@angular/core';
import { base64, ConfigService, sha256, StorageKeys, StorageService, TEXT_ENCODER } from '@dnd-mapp/shared-ui';
import { nanoid } from 'nanoid';
import { from, map, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private readonly textEncoder = inject(TEXT_ENCODER);
    private readonly storageService = inject(StorageService);
    private readonly configService = inject(ConfigService);

    public readonly authenticated = signal(false);

    public authorize() {
        const codeVerifier = this.generateCodeVerifier();
        const state = nanoid();
        const nonce = nanoid();

        this.storageService.setItem(StorageKeys.CODE_VERIFIER, codeVerifier);
        this.storageService.setItem(StorageKeys.AUTH_STATE, state);
        this.storageService.setItem(StorageKeys.ID_NONCE, nonce);

        return this.generateCodeChallenge(codeVerifier).pipe(
            tap((codeChallenge) => {
                const clientId = this.configService.config.clientId;
                const redirectUrl = location.href;

                const url = new URL('https://localhost.auth.dndmapp.dev:4350/authorize');

                url.searchParams.set('codeChallenge', codeChallenge);
                url.searchParams.set('state', state);
                url.searchParams.set('nonce', nonce);
                url.searchParams.set('clientId', clientId);
                url.searchParams.set('redirectUrl', redirectUrl);

                location.href = url.toString();
            }),
        );
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
