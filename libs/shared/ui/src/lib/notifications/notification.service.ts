import { Injectable } from '@angular/core';
import { NotificationConfig } from './notification-types';

@Injectable({ providedIn: 'root' })
export class NotificationService {
    public showNotification(config: NotificationConfig) {
        console.log({ config });
    }
}
