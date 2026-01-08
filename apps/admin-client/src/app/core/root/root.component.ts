import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginButtonComponent } from '@dnd-mapp/auth/ui';
import { NavBrandComponent, TopAppBarComponent } from '@dnd-mapp/shared/ui';

@Component({
    selector: 'dma-root',
    templateUrl: './root.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class]': `'h-dvh flex flex-col bg-neutral-50'`,
    },
    imports: [RouterOutlet, TopAppBarComponent, NavBrandComponent, LoginButtonComponent],
})
export class RootComponent {}
