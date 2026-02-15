import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { NotificationComponent } from './notification.component';
import { NotificationService } from './notification.service';

@Component({
    selector: 'dma-notifications-zone',
    templateUrl: './notifications-zone.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class]': `'flex flex-col gap-3 absolute bottom-4 left-4'`,
    },
    imports: [NgComponentOutlet],
})
export class NotificationsZoneComponent {
    private readonly notificationService = inject(NotificationService);

    protected readonly notificationComponent = NotificationComponent;

    protected readonly notifications = computed(() => this.notificationService.notifications$().slice(0, 3));
}
