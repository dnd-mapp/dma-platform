import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent } from '@dnd-mapp/shared-ui';

@Component({
    selector: 'dma-sign-up-button',
    templateUrl: './sign-up-button.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ButtonComponent],
})
export class SignUpButtonComponent {
    protected onSignUp() {
        location.href = 'https://localhost.auth.dndmapp.dev:4300/sign-up';
    }
}
