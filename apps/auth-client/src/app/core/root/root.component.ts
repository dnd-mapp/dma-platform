import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '@dnd-mapp/auth-ui';
import { AppTopBarComponent, NavBrandComponent, VerticalRuleComponent } from '@dnd-mapp/shared-ui';

@Component({
    selector: 'dma-root',
    templateUrl: './root.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class]': `'flex flex-col h-dvh'`,
        '[class.bg-blue-100]': `!authService.authenticated()`,
        '[class.bg-neutral-50]': `authService.authenticated()`,
        '[class.text-neutral-900]': `authService.authenticated()`,
    },
    imports: [RouterOutlet, AppTopBarComponent, NavBrandComponent, VerticalRuleComponent],
})
export class RootComponent {
    protected readonly authService = inject(AuthService);
}
