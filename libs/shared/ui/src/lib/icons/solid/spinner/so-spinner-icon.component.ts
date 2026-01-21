import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'dma-icon[dma-so-spinner-icon]',
    templateUrl: './so-spinner-icon.component.svg',
    styleUrl: '../../_icon.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class]': `''`,
    },
    imports: [],
})
export class SoSpinnerIconComponent {}
