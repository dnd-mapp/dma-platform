import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'dma-icon[dma-so-user-icon]',
    templateUrl: './so-user-icon.component.svg',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class]': `'block w-[1.5rem]'`,
    },
    imports: [],
})
export class SoUserIconComponent {}
