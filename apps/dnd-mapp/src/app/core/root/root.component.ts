import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { TokenGrantTypes } from '@dnd-mapp/auth-domain';
import {
    AuthServerService,
    AuthService,
    LoginButtonComponent,
    ProfileButtonComponent,
    SignUpButtonComponent,
} from '@dnd-mapp/auth-ui';
import {
    AppTopBarComponent,
    NavbarComponent,
    NavBrandComponent,
    NavLinkComponent,
    VerticalRuleComponent,
} from '@dnd-mapp/shared-ui';

@Component({
    selector: 'dma-root',
    templateUrl: './root.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class]': `'flex flex-col h-dvh bg-neutral-50 text-neutral-900'`,
    },
    imports: [
        RouterOutlet,
        AppTopBarComponent,
        NavBrandComponent,
        VerticalRuleComponent,
        NavbarComponent,
        NavLinkComponent,
        LoginButtonComponent,
        SignUpButtonComponent,
        ProfileButtonComponent,
    ],
})
export class RootComponent implements OnInit {
    protected readonly authService = inject(AuthService);
    private readonly destroyRef = inject(DestroyRef);
    private readonly authServerService = inject(AuthServerService);

    public ngOnInit() {
        console.log('RootComponent::ngOnInit');
        this.authServerService.initialize();
        this.authService
            .token({ grantType: TokenGrantTypes.REFRESH_TOKEN }, true)
            .request.pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe();
    }
}
