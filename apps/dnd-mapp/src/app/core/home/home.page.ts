import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { TokenGrantTypes } from '@dnd-mapp/auth-domain';
import { AuthService } from '@dnd-mapp/auth-ui';

@Component({
    selector: 'dma-home',
    templateUrl: './home.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class]': `'block h-full'`,
    },
    imports: [],
})
export class HomePage implements OnInit {
    private readonly route = inject(ActivatedRoute);
    private readonly destroyRef = inject(DestroyRef);
    private readonly authService = inject(AuthService);

    public ngOnInit() {
        const { authCode, state } = this.getAuthCodeAndStateFromRoute();

        if (authCode && state) {
            const { request } = this.authService.token({
                state: state,
                authCode: authCode,
                grantType: TokenGrantTypes.AUTH_CODE,
            });
            request.pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
        }
    }

    private getAuthCodeAndStateFromRoute() {
        const queryParams = this.route.snapshot.queryParamMap;

        if (queryParams.has('state') && queryParams.has('authCode')) {
            return {
                state: queryParams.get('state'),
                authCode: queryParams.get('authCode'),
            };
        }
        return {
            state: null,
            authCode: null,
        };
    }
}
