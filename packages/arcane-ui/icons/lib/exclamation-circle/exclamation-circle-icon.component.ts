import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconDirective } from '../icon.directive';

/**
 * Exclamation circle icon for warnings or important notices.
 *
 * The icon inherits its color from `currentColor` and is `aria-hidden` by default,
 * so a visible or screen-reader-accessible label must be provided by the parent.
 *
 * @example
 * ```html
 * <!-- scales with surrounding text -->
 * <dma-icon-exclamation-circle />
 *
 * <!-- explicit size -->
 * <dma-icon-exclamation-circle size="lg" />
 * ```
 */
@Component({
    selector: 'dma-icon-exclamation-circle',
    templateUrl: `./exclamation-circle-icon.component.html`,
    styleUrl: './exclamation-circle-icon.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    hostDirectives: [{ directive: IconDirective, inputs: ['size'] }],
})
export class ExclamationCircleIconComponent {}
