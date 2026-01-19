import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'dma-app-top-bar',
    templateUrl: './app-top-bar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class]': `'block bg-neutral-100 px-4 py-3 border-b border-neutral-200'`,
    },
    imports: [],
})
export class AppTopBarComponent {}
