import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { buttonTypeAttribute, ButtonTypes, DEFAULT_BUTTON_TYPE } from './button-type';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'button[dma-button]',
    templateUrl: './button.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class]': `'px-3 py-1 rounded-md font-medium cursor-pointer disabled:cursor-default disabled:bg-neutral-400 disabled:opacity-33'`,
        '[class.bg-neutral-100]': 'isBase()',
        '[class.hover:bg-neutral-200]': 'isBase()',
        '[class.focus:bg-neutral-200]': 'isBase()',
        '[class.focus:outline-blue-400]': 'isBase()',
        '[class.active:bg-neutral-300]': 'isBase()',
        '[class.text-neutral-100]': 'isPrimary()',
        '[class.bg-blue-400]': 'isPrimary()',
        '[class.hover:bg-blue-500]': 'isPrimary()',
        '[class.focus:bg-blue-500]': 'isPrimary()',
        '[class.focus:outline-amber-400]': 'isPrimary()',
        '[class.active:bg-blue-600]': 'isPrimary()',
    },
    imports: [],
})
export class ButtonComponent {
    public readonly buttonType = input(DEFAULT_BUTTON_TYPE, { alias: 'dma-button', transform: buttonTypeAttribute });

    protected readonly isBase = computed(() => this.buttonType() === ButtonTypes.BASE);

    protected readonly isPrimary = computed(() => this.buttonType() === ButtonTypes.PRIMARY);
}
