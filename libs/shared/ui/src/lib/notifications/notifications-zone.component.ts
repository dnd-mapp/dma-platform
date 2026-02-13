import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { NotificationService } from './notification.service';

@Component({
    selector: 'dma-notifications-zone',
    templateUrl: './notifications-zone.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class]': `'absolute bottom-4 left-4'`,
    },
    imports: [],
})
export class NotificationsZoneComponent {
    private readonly notificationService = inject(NotificationService);

    constructor() {
        effect(() => {
            console.log(this.notificationService.notifications$());
        });
    }
}
