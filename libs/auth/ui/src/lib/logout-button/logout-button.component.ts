import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ButtonComponent } from '@dnd-mapp/shared-ui';
import { AuthService } from '../auth';

@Component({
    selector: 'dma-logout-button',
    templateUrl: './logout-button.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ButtonComponent],
})
export class LogoutButtonComponent {
    private readonly destroyRef = inject(DestroyRef);
    private readonly authService = inject(AuthService);

    protected processing = signal(false);

    protected onLogout() {
        const { processing, request } = this.authService.logout();
        this.processing = processing;

        request.pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
    }
}
