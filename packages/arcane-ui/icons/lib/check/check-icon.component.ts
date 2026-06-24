import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconDirective } from '../icon.directive';

/**
 * Check icon for confirmation or completed states.
 *
 * The icon inherits its color from `currentColor` and is `aria-hidden` by default,
 * so a visible or screen-reader-accessible label must be provided by the parent.
 *
 * @example
 * ```html
 * <!-- scales with surrounding text -->
 * <dma-icon-check />
 *
 * <!-- explicit size -->
 * <dma-icon-check size="lg" />
 * ```
 */
@Component({
    selector: 'dma-icon-check',
    templateUrl: `./check-icon.component.html`,
    styleUrl: './check-icon.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    hostDirectives: [{ directive: IconDirective, inputs: ['size'] }],
})
export class CheckIconComponent {}
