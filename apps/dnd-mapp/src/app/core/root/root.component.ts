import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginButtonComponent, SignUpButtonComponent } from '@dnd-mapp/auth-ui';
import {
    AppTopBarComponent,
    NavbarComponent,
    NavBrandComponent,
    NavLinkComponent,
    VerticalRuleComponent,
} from '@dnd-mapp/shared-ui';
import { AuthServerService } from '../../../../../../libs/auth/ui/src/lib/auth/auth-server.service';

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
    ],
})
export class RootComponent implements OnInit {
    private readonly authServerService = inject(AuthServerService);

    public ngOnInit() {
        this.authServerService.initialize();
    }
}
