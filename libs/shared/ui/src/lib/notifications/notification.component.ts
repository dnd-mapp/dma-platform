import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, input, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NotificationData, NotificationService, NotificationTypes } from '@dnd-mapp/shared-ui';
import { take, timer } from 'rxjs';

const notificationLifetime = 5000;

@Component({
    selector: 'dma-notification',
    templateUrl: './notification.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        'animate.enter': 'animation-fade-in',
        'animate.leave': 'animation-fade-out',
        'class': `text-neutral-50 block p-3 text-sm rounded-md shadow-lg`,
        '[class.bg-neutral-700]': 'isInfo()',
        '[class.bg-red-600]': 'isError()',
        '[class.bg-emerald-500]': 'isSuccess()',
    },
    imports: [],
})
export class NotificationComponent implements OnInit {
    private readonly destroyRef = inject(DestroyRef);
    private readonly notificationService = inject(NotificationService);

    public readonly data = input.required<NotificationData>();

    protected readonly isInfo = computed(() => this.data().type === NotificationTypes.INFO);

    protected readonly isSuccess = computed(() => this.data().type === NotificationTypes.SUCCESS);

    protected readonly isError = computed(() => this.data().type === NotificationTypes.ERROR);

    protected readonly hasTitle = computed(() => Boolean(this.data().title));

    protected readonly title = computed(() => {
        const title = this.data().title;

        if (this.isError()) return `Error: ${title}`;
        if (this.isSuccess()) return `Success: ${title}`;
        return title;
    });

    public ngOnInit() {
        timer(new Date(this.data().timestamp.getTime() + notificationLifetime))
            .pipe(take(1), takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: () => this.notificationService.removeNotificationByTimestamp(this.data().timestamp),
            });
    }
}
