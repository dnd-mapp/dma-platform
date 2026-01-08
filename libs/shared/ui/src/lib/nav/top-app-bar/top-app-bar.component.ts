import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'dma-top-app-bar',
    templateUrl: './top-app-bar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class]': `'bg-neutral-100'`,
    },
    imports: [],
})
export class TopAppBarComponent {}
