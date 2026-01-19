import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'dma-home',
    templateUrl: './home.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class]': `'block h-full'`,
    },
    imports: [],
})
export class HomePage {}
