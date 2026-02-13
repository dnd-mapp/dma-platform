import { Injectable, signal } from '@angular/core';
import { NotificationConfig } from './notification-types';

@Injectable({ providedIn: 'root' })
export class NotificationService {
    private readonly notifications = signal<NotificationConfig[]>([]);

    public readonly notifications$ = this.notifications.asReadonly();

    public showNotification(notification: NotificationConfig) {
        this.notifications.update((notifications) => [...notifications, notification]);
    }
}
