import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconDirective } from '../icon.directive';

/**
 * Plus icon for add or create actions.
 *
 * The icon inherits its color from `currentColor` and is `aria-hidden` by default,
 * so a visible or screen-reader-accessible label must be provided by the parent.
 *
 * @example
 * ```html
 * <!-- scales with surrounding text -->
 * <dma-icon-plus />
 *
 * <!-- explicit size -->
 * <dma-icon-plus size="lg" />
 * ```
 */
@Component({
    selector: 'dma-icon-plus',
    templateUrl: `./plus-icon.component.html`,
    styleUrl: './plus-icon.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    hostDirectives: [{ directive: IconDirective, inputs: ['size'] }],
})
export class PlusIconComponent {}
