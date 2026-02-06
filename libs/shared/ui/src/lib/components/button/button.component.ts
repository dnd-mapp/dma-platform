import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { SoSpinnerIconComponent } from '../../icons';
import { buttonSizeAttribute, ButtonSizes, DEFAULT_BUTTON_SIZE } from './button-size';
import { buttonTypeAttribute, ButtonTypes, DEFAULT_BUTTON_TYPE } from './button-type';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'button[dma-button]',
    templateUrl: './button.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class]': `'block grid place-items-center rounded-md font-medium cursor-pointer disabled:cursor-default disabled:opacity-33 disabled:bg-neutral-400 disabled:text-neutral-900'`,
        '[class.px-4]': 'isMedium()',
        '[class.py-1]': 'isMedium()',
        '[class.p-1]': 'isSmall()',
        '[class.text-neutral-900]': `isBase()`,
        '[class.bg-neutral-100]': `isBase() || isDangerSubtle()`,
        '[class.hover:bg-neutral-200]': `isBase() || isDangerSubtle()`,
        '[class.active:bg-neutral-300]': `isBase() || isDangerSubtle()`,
        '[class.text-neutral-100]': `isPrimary()`,
        '[class.bg-blue-400]': `isPrimary()`,
        '[class.hover:bg-blue-500]': `isPrimary()`,
        '[class.active:bg-blue-600]': `isPrimary()`,
        '[class.text-red-600]': `isDangerSubtle()`,
        '[attr.disabled]': 'isDisabled()',
    },
    imports: [SoSpinnerIconComponent],
})
export class ButtonComponent {
    public readonly buttonType = input(DEFAULT_BUTTON_TYPE, { alias: 'dma-button', transform: buttonTypeAttribute });

    public readonly size = input(DEFAULT_BUTTON_SIZE, { transform: buttonSizeAttribute });

    public readonly processing = input(false, { transform: booleanAttribute });

    public readonly disabled = input(false, { transform: booleanAttribute });

    protected readonly isBase = computed(() => this.buttonType() === ButtonTypes.BASE);

    protected readonly isPrimary = computed(() => this.buttonType() === ButtonTypes.PRIMARY);

    protected readonly isDangerSubtle = computed(() => this.buttonType() === ButtonTypes.DANGER_SUBTLE);

    protected readonly isMedium = computed(() => this.size() === ButtonSizes.MEDIUM);

    protected readonly isSmall = computed(() => this.size() === ButtonSizes.SMALL);

    protected readonly isDisabled = computed(() => (this.disabled() || this.processing() ? '' : undefined));
}
