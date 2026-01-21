import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ButtonComponent } from '@dnd-mapp/shared-ui';
import { AuthService } from '../auth';

@Component({
    selector: 'dma-login-button',
    templateUrl: './login-button.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ButtonComponent],
})
export class LoginButtonComponent {
    private readonly authService = inject(AuthService);

    protected onLogIn() {
        this.authService.authorize();
    }
}
