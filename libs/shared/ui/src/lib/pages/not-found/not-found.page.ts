import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { ButtonComponent } from '@dnd-mapp/shared-ui';
import { from } from 'rxjs';

@Component({
    selector: 'dma-not-found',
    templateUrl: './not-found.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class]': `'flex items-center h-full'`,
    },
    imports: [ButtonComponent],
})
export class NotFoundPage {
    private readonly router = inject(Router);
    private readonly destroyRef = inject(DestroyRef);

    protected onVisitHomePage() {
        from(this.router.navigateByUrl('/')).pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
    }

    protected onContactUs() {
        location.href = 'https://github.com/dnd-mapp/dma-platform/issues';
    }
}
