import { inject, Injectable } from '@angular/core';
import type { RedirectResponseDto } from '@dnd-mapp/auth/domain';
import { sha256 } from '@dnd-mapp/shared/ui';
import { nanoid } from 'nanoid';
import { from, map, of, switchMap } from 'rxjs';
import { AuthServerService } from '../auth-server';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private readonly authServerService = inject(AuthServerService);

    private readonly endPoint = '/auth';

    private codeVerifier: string;
    private state: string;

    public authorize() {
        return this.generateState().pipe(
            switchMap(() => this.generateCodeVerifier()),
            switchMap((codeVerifier) => this.generateCodeChallenge(codeVerifier)),
            switchMap((codeChallenge) =>
                this.authServerService.get<RedirectResponseDto>(
                    `${this.endPoint}/authorize`,
                    this.authorizeParams(codeChallenge),
                ),
            ),
        );
    }

    private generateState() {
        this.state = nanoid();
        return of(this.state);
    }

    private generateCodeVerifier() {
        this.codeVerifier = btoa(nanoid());

        return of(this.codeVerifier);
    }

    private generateCodeChallenge(codeVerifier: string) {
        return from(sha256(codeVerifier)).pipe(map((hash) => btoa(hash)));
    }

    // TODO: Add Client ID which should be retrieved from a configuration file
    private authorizeParams(codeChallenge: string) {
        return new URLSearchParams({
            codeChallenge: codeChallenge,
            state: this.state,
        });
    }
}
