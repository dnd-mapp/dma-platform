import { inject, Injectable, signal } from '@angular/core';
import { base64, StorageKeys, StorageService, TEXT_ENCODER } from '@dnd-mapp/shared-ui';
import { nanoid } from 'nanoid';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private readonly textEncoder = inject(TEXT_ENCODER);
    private readonly storageService = inject(StorageService);

    public readonly authenticated = signal(false);

    public authorize() {
        const codeVerifier = this.generateCodeVerifier();

        this.storageService.setItem(StorageKeys.CODE_VERIFIER, codeVerifier);

        location.href = 'https://localhost.auth.dndmapp.dev:4350/authorize';
    }

    private generateCodeVerifier() {
        return base64(nanoid(), this.textEncoder);
    }
}
