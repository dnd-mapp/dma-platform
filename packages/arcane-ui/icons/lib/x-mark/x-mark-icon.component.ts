import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconDirective } from '../icon.directive';

/**
 * X-mark icon for dismiss / close actions.
 *
 * The icon inherits its color from `currentColor` and is `aria-hidden` by default,
 * so a visible or screen-reader-accessible label must be provided by the parent.
 *
 * @example
 * ```html
 * <!-- scales with surrounding text -->
 * <dma-icon-x-mark />
 *
 * <!-- explicit size -->
 * <dma-icon-x-mark size="lg" />
 * ```
 */
@Component({
    selector: 'dma-icon-x-mark',
    templateUrl: `./x-mark-icon.component.html`,
    styleUrl: './x-mark-icon.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    hostDirectives: [{ directive: IconDirective, inputs: ['size'] }],
})
export class XMarkIconComponent {}
