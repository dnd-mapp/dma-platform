export const NotificationTypes = {
    INFO: 'info',
    SUCCESS: 'success',
    ERROR: 'error',
} as const;

export type NotificationType = (typeof NotificationTypes)[keyof typeof NotificationTypes];

export interface NotificationConfig {
    type: NotificationType;
    title: string;
    message: string;
}
