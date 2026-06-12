import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconDirective } from '../icon.directive';

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
    hostDirectives: [{ directive: IconDirective, inputs: ['size'] }],
})
export class SpinnerIconComponent {}
