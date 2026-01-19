import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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
    imports: [RouterOutlet, AppTopBarComponent, NavBrandComponent, VerticalRuleComponent, NavbarComponent, NavLinkComponent],
})
export class RootComponent {}
