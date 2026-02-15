export const NotificationTypes = {
    INFO: 'info',
    SUCCESS: 'success',
    ERROR: 'error',
} as const;

export type NotificationType = (typeof NotificationTypes)[keyof typeof NotificationTypes];

export interface NotificationData {
    type: NotificationType;
    message: string;
    timestamp: Date;
    title?: string;
}
