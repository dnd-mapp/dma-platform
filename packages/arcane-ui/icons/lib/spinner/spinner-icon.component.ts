import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

@Component({
    selector: 'dma-icon-spinner',
    templateUrl: `./spinner-icon.component.html`,
    styleUrl: './spinner-icon.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        'aria-hidden': 'true',
        '[class]': 'size()',
    },
})
export class DmaSpinnerIconComponent {
    public readonly size = input<IconSize>('md');
}
