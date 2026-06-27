import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconDirective } from '../icon.directive';

/**
 * Eye icon for reveal / visible states.
 *
 * The icon inherits its color from `currentColor` and is `aria-hidden` by default,
 * so a visible or screen-reader-accessible label must be provided by the parent.
 *
 * @example
 * ```html
 * <!-- scales with surrounding text -->
 * <dma-icon-eye />
 *
 * <!-- explicit size -->
 * <dma-icon-eye size="lg" />
 * ```
 */
@Component({
    selector: 'dma-icon-eye',
    templateUrl: `./eye-icon.component.html`,
    styleUrl: './eye-icon.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    hostDirectives: [{ directive: IconDirective, inputs: ['size'] }],
})
export class EyeIconComponent {}
