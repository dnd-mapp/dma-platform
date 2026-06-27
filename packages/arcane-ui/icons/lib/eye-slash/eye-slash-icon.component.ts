import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconDirective } from '../icon.directive';

/**
 * Eye-slash icon for hidden / password-concealed states.
 *
 * The icon inherits its color from `currentColor` and is `aria-hidden` by default,
 * so a visible or screen-reader-accessible label must be provided by the parent.
 *
 * @example
 * ```html
 * <!-- scales with surrounding text -->
 * <dma-icon-eye-slash />
 *
 * <!-- explicit size -->
 * <dma-icon-eye-slash size="lg" />
 * ```
 */
@Component({
    selector: 'dma-icon-eye-slash',
    templateUrl: `./eye-slash-icon.component.html`,
    styleUrl: './eye-slash-icon.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    hostDirectives: [{ directive: IconDirective, inputs: ['size'] }],
})
export class EyeSlashIconComponent {}
