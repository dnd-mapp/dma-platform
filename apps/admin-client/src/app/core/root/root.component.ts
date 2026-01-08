import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'dma-root',
    templateUrl: './root.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class]': `'h-dvh flex flex-col'`,
    },
    imports: [RouterOutlet],
})
export class RootComponent {}
