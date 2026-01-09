import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'dma-icon[dma-so-user-icon]',
    templateUrl: './so-user-icon.component.svg',
    host: {
        '[class]': `'w-[1rem] block'`,
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SoUserIconComponent {}
