import { inject, Injectable } from '@angular/core';
import type { GetTokenDto, LoginDto, RedirectResponseDto } from '@dnd-mapp/auth-domain';
import { ConfigService, RequestService } from '@dnd-mapp/shared-ui';

interface AuthorizeParams {
    codeChallenge: string;
    state: string;
    nonce: string;
    clientId: string;
    redirectUrl: string;
}

@Injectable({ providedIn: 'root' })
export class AuthServerService {
    private readonly requestService = inject(RequestService);
    private readonly configService = inject(ConfigService);

    private baseUrl!: string;

    public initialize() {
        this.baseUrl = this.configService.config.authServerBaseUrl;
    }

    public authorize(params: AuthorizeParams) {
        const { codeChallenge, state, nonce, redirectUrl, clientId } = params;

        const url = new URL(`${this.baseUrl}/authorize`);
        url.searchParams.set('codeChallenge', codeChallenge);
        url.searchParams.set('state', state);
        url.searchParams.set('nonce', nonce);
        url.searchParams.set('clientId', clientId);
        url.searchParams.set('redirectUrl', redirectUrl);

        location.href = url.toString();
    }

    public login(data: LoginDto) {
        return this.requestService.post<LoginDto, RedirectResponseDto>(
            new URL('/login', this.baseUrl).toString(),
            data,
        );
    }

    public token(data: GetTokenDto) {
        return this.requestService.post(new URL('/token', this.baseUrl).toString(), data);
    }
}
