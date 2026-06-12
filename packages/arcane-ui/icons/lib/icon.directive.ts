import { Directive, input } from '@angular/core';
import { type IconSize } from '@dnd-mapp/arcane-ui/common';

/**
 * Shared structural directive applied to all icon components via `hostDirectives`.
 *
 * Handles two concerns common to every icon:
 * - Marks the host element as `aria-hidden="true"` so screen readers skip decorative icons.
 * - Applies the active {@link IconSize} token as a CSS class on the host, which the
 *   `icon-base` SCSS mixin uses to set explicit dimensions.
 *
 * @example
 * ```ts
 * // In an icon component:
 * hostDirectives: [{ directive: IconDirective, inputs: ['size'] }]
 * ```
 */
@Directive({
    selector: '[dmaIcon]',
    host: {
        'aria-hidden': 'true',
        '[class]': 'size()',
    },
})
export class IconDirective {
    /** Sets the dimensions of the icon using a named size token. Omit to scale with the surrounding font size (1em). */
    public readonly size = input<IconSize>();
}
