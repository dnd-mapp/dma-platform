import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'dma-vr',
    template: ``,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class]': `'inline-block h-full border-s border-neutral-400 rounded-md'`,
    },
    imports: [],
})
export class VerticalRuleComponent {}
