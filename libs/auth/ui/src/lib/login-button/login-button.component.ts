import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent } from '@dnd-mapp/shared-ui';

@Component({
    selector: 'dma-login-button',
    templateUrl: './login-button.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ButtonComponent],
})
export class LoginButtonComponent {
    protected onLogIn() {
        location.href = 'https://localhost.auth.dndmapp.dev:4350/authorize';
    }
}
