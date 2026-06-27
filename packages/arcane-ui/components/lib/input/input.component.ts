import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { DEFAULT_INPUT_TYPE, type InputType } from '@dnd-mapp/arcane-ui/common';
import { CheckIconComponent, ExclamationCircleIconComponent } from '@dnd-mapp/arcane-ui/icons';
import { BaseInputComponent } from './base-input.component';

export type { InputStatus } from './base-input.component';

/**
 * A single-line text input with leading/trailing icon and action slots, automatic
 * validation-state icons, and full Angular forms integration.
 *
 * @example
 * ```html
 * <dma-input inputId="email" label="Email" type="email" />
 * ```
 */
@Component({
    selector: 'dma-input',
    imports: [CheckIconComponent, ExclamationCircleIconComponent],
    templateUrl: './input.component.html',
    styleUrl: './input.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[attr.data-status]': 'effectiveStatus()',
        '[class.disabled]': 'effectiveDisabled()',
    },
})
export class InputComponent extends BaseInputComponent<string> {
    /** HTML `type` attribute forwarded to the native input. Defaults to `'text'`. */
    public readonly type = input<InputType>(DEFAULT_INPUT_TYPE);

    protected readonly ariaDescribedBy = computed(() => {
        const parts: string[] = [];
        if (this.helperText()) parts.push(this.helperTextId());
        if (this.effectiveStatus() === 'error' && this.errorMessage()) parts.push(this.errorMessageId());
        return parts.length > 0 ? parts.join(' ') : null;
    });
}
