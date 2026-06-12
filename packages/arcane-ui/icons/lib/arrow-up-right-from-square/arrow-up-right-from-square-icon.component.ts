import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconDirective } from '../icon.directive';

/**
 * Arrow-up-right-from-square icon. Conventional use is trailing (e.g. on external link buttons).
 *
 * The icon inherits its color from `currentColor` and is `aria-hidden` by default,
 * so a visible or screen-reader-accessible label must be provided by the parent.
 *
 * @example
 * ```html
 * <!-- scales with surrounding text -->
 * <dma-icon-arrow-up-right-from-square />
 *
 * <!-- explicit size -->
 * <dma-icon-arrow-up-right-from-square size="lg" />
 * ```
 */
@Component({
    selector: 'dma-icon-arrow-up-right-from-square',
    templateUrl: `./arrow-up-right-from-square-icon.component.html`,
    styleUrl: './arrow-up-right-from-square-icon.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    hostDirectives: [{ directive: IconDirective, inputs: ['size'] }],
})
export class ArrowUpRightFromSquareIconComponent {}
