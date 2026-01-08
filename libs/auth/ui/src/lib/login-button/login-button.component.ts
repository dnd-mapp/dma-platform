import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent } from '@dnd-mapp/shared/ui';

@Component({
    selector: 'dma-login-button',
    templateUrl: './login-button.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ButtonComponent],
})
export class LoginButtonComponent {
    protected onLogin() {
        console.warn('REDIRECTING TO LOGIN PAGE');
    }
}
