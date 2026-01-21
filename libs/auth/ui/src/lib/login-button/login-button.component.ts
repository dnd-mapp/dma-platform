import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ButtonComponent } from '@dnd-mapp/shared-ui';
import { AuthService } from '../auth';

@Component({
    selector: 'dma-login-button',
    templateUrl: './login-button.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ButtonComponent],
})
export class LoginButtonComponent {
    private readonly destroyRef = inject(DestroyRef);
    private readonly authService = inject(AuthService);

    protected onLogIn() {
        this.authService.authorize().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
    }
}
