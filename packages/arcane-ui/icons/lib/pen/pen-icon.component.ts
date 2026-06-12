import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconDirective } from '../icon.directive';

/**
 * Pen icon representing an edit or write action.
 *
 * The icon inherits its color from `currentColor` and is `aria-hidden` by default,
 * so a visible or screen-reader-accessible label must be provided by the parent.
 *
 * @example
 * ```html
 * <!-- scales with surrounding text -->
 * <dma-icon-pen />
 *
 * <!-- explicit size -->
 * <dma-icon-pen size="lg" />
 * ```
 */
@Component({
    selector: 'dma-icon-pen',
    templateUrl: `./pen-icon.component.html`,
    styleUrl: './pen-icon.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    hostDirectives: [{ directive: IconDirective, inputs: ['size'] }],
})
export class PenIconComponent {}
