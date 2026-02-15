import { Injectable, signal } from '@angular/core';
import { NotificationData } from './notification-types';

@Injectable({ providedIn: 'root' })
export class NotificationService {
    private readonly notifications = signal<NotificationData[]>([]);

    public readonly notifications$ = this.notifications.asReadonly();

    public showNotification(notification: NotificationData) {
        this.notifications.update((notifications) => [...notifications, notification]);
    }

    public removeNotificationByTimestamp(timestamp: Date) {
        this.notifications.update((notifications) =>
            notifications.filter((notification) => notification.timestamp !== timestamp),
        );
    }
}
