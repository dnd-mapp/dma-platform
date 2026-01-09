import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'dma-icon[dma-so-lock-icon]',
    templateUrl: './so-lock-icon.component.svg',
    host: {
        '[class]': `'w-[1rem] block'`,
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SoLockIconComponent {}
