import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import {
    buttonAppearanceAttr,
    buttonIntentAttr,
    buttonSizeAttr,
    DEFAULT_BUTTON_APPEARANCE,
    DEFAULT_BUTTON_INTENT,
    DEFAULT_BUTTON_SIZE,
} from '@dnd-mapp/arcane-ui/common';
import { SpinnerIconComponent } from '@dnd-mapp/arcane-ui/icons';

/**
 * Enhances a native `<button>` element with DnD Mapp's design-system appearance,
 * intent, and size variants.
 *
 * Apply as an attribute selector on a `<button>` element:
 *
 * @example
 * ```html
 * <button dma-button>Label</button>
 * <button dma-button appearance="outlined" intent="danger" size="sm">Delete</button>
 * ```
 */
@Component({
    selector: 'button[dma-button]',
    imports: [SpinnerIconComponent],
    templateUrl: './button.component.html',
    styleUrl: './button.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        'type': 'button',
        '[class]': 'this.classNames()',
        '[class.icon-only]': 'iconOnly()',
        '[class.loading]': 'loading()',
        '[class.full-width]': 'fullWidth()',
    },
})
export class ButtonComponent {
    /** Visual presentation variant. Defaults to `filled`. */
    public readonly appearance = input(DEFAULT_BUTTON_APPEARANCE, { transform: buttonAppearanceAttr });

    /** Semantic colour intent. Defaults to `primary`. */
    public readonly intent = input(DEFAULT_BUTTON_INTENT, { transform: buttonIntentAttr });

    /** Size of the button. Defaults to `md`. */
    public readonly size = input(DEFAULT_BUTTON_SIZE, { transform: buttonSizeAttr });

    /** When `true`, renders the button as a square icon-only target (no text padding). */
    public readonly iconOnly = input(false);

    /** When `true`, indicates an in-progress action; applies a loading state class. */
    public readonly loading = input(false);

    /** When `true`, stretches the button to fill its container's width. */
    public readonly fullWidth = input(false);

    /** Combines appearance, intent, and size into the host's `[class]` binding. */
    protected readonly classNames = computed(() => `${this.appearance()} ${this.intent()} ${this.size()}`);
}
