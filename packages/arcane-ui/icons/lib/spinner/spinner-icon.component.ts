import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { type IconSize } from '@dnd-mapp/arcane-ui/common';

/**
 * Animated spinner icon that indicates a loading or in-progress state.
 *
 * The icon inherits its color from `currentColor` and is `aria-hidden` by default,
 * so a visible or screen-reader-accessible label must be provided by the parent.
 *
 * @example
 * ```html
 * <!-- scales with surrounding text -->
 * <dma-icon-spinner />
 *
 * <!-- explicit size -->
 * <dma-icon-spinner size="lg" />
 * ```
 */
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
export class SpinnerIconComponent {
    /** Sets the dimensions of the icon using a named size token. Omit to scale with the surrounding font size (1em). */
    public readonly size = input<IconSize>();
}
