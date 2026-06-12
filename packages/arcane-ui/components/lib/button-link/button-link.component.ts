import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import {
    buttonAppearanceAttr,
    buttonIntentAttr,
    buttonSizeAttr,
    DEFAULT_BUTTON_APPEARANCE,
    DEFAULT_BUTTON_INTENT,
    DEFAULT_BUTTON_SIZE,
} from '@dnd-mapp/arcane-ui/common';

/**
 * Enhances a native `<a>` element with DnD Mapp's design-system appearance,
 * intent, and size variants.
 *
 * Apply as an attribute selector on an `<a>` element:
 *
 * @example
 * ```html
 * <a dma-button-link href="/dashboard">Dashboard</a>
 * <a dma-button-link appearance="outlined" intent="danger" href="/delete">Delete</a>
 * ```
 *
 * Disabled state is communicated via `aria-disabled` and `tabindex="-1"` rather
 * than the HTML `disabled` attribute, which is not valid on anchor elements.
 */
@Component({
    selector: 'a[dma-button-link]',
    templateUrl: './button-link.component.html',
    styleUrl: './button-link.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class]': 'this.classNames()',
        '[class.icon-only]': 'iconOnly()',
        '[class.full-width]': 'fullWidth()',
        '[attr.aria-disabled]': 'disabled() || null',
        '[attr.tabindex]': 'disabled() ? -1 : null',
    },
})
export class ButtonLinkComponent {
    /** Visual presentation variant. Defaults to `filled`. */
    public readonly appearance = input(DEFAULT_BUTTON_APPEARANCE, { transform: buttonAppearanceAttr });

    /** Semantic colour intent. Defaults to `primary`. */
    public readonly intent = input(DEFAULT_BUTTON_INTENT, { transform: buttonIntentAttr });

    /** Size of the button-link. Defaults to `md`. */
    public readonly size = input(DEFAULT_BUTTON_SIZE, { transform: buttonSizeAttr });

    /** When `true`, renders the link as a square icon-only target (no text padding). */
    public readonly iconOnly = input(false);

    /** When `true`, stretches the link to fill its container's width. */
    public readonly fullWidth = input(false);

    /**
     * When `true`, marks the link as disabled via `aria-disabled` and removes it
     * from the tab order via `tabindex="-1"`. Navigation is prevented by the
     * consumer omitting or clearing the `href` attribute.
     */
    public readonly disabled = input(false);

    /** Combines appearance, intent, and size into the host's `[class]` binding. */
    protected readonly classNames = computed(() => `${this.appearance()} ${this.intent()} ${this.size()}`);
}
