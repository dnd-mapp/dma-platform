import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ButtonComponent, DropdownAnchorDirective, SoCircleUserIconComponent } from '@dnd-mapp/shared-ui';
import { AuthService } from '../auth';
import { LogoutButtonComponent } from '../logout-button';

@Component({
    selector: 'dma-profile-button',
    templateUrl: './profile-button.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ButtonComponent, SoCircleUserIconComponent, DropdownAnchorDirective, LogoutButtonComponent],
})
export class ProfileButtonComponent {
    protected readonly authService = inject(AuthService);
}
