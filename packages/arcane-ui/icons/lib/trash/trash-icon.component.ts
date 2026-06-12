import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconDirective } from '../icon.directive';

/**
 * Trash icon for removal actions.
 *
 * The icon inherits its color from `currentColor` and is `aria-hidden` by default,
 * so a visible or screen-reader-accessible label must be provided by the parent.
 *
 * @example
 * ```html
 * <!-- scales with surrounding text -->
 * <dma-icon-trash />
 *
 * <!-- explicit size -->
 * <dma-icon-trash size="lg" />
 * ```
 */
@Component({
    selector: 'dma-icon-trash',
    templateUrl: `./trash-icon.component.html`,
    styleUrl: './trash-icon.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    hostDirectives: [{ directive: IconDirective, inputs: ['size'] }],
})
export class TrashIconComponent {}
