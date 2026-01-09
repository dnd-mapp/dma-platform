import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'dma-root',
    templateUrl: './root.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class]': `'h-dvh flex flex-col bg-neutral-50'`,
    },
    imports: [RouterOutlet],
})
export class RootComponent {}
