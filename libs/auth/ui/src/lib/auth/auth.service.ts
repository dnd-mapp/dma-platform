import { inject, Injectable, signal } from '@angular/core';
import { base64, sha256, StorageKeys, StorageService, TEXT_ENCODER } from '@dnd-mapp/shared-ui';
import { nanoid } from 'nanoid';
import { from, map, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private readonly textEncoder = inject(TEXT_ENCODER);
    private readonly storageService = inject(StorageService);

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
                location.href = `https://localhost.auth.dndmapp.dev:4350/authorize?codeChallenge=${codeChallenge}&state=${state}&nonce=${nonce}`;
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
