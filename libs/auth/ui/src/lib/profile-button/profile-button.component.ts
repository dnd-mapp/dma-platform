import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ButtonComponent, SoCircleUserIconComponent } from '@dnd-mapp/shared-ui';
import { AuthService } from '../auth';

@Component({
    selector: 'dma-profile-button',
    templateUrl: './profile-button.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ButtonComponent, SoCircleUserIconComponent],
})
export class ProfileButtonComponent {
    protected readonly authService = inject(AuthService);
}
