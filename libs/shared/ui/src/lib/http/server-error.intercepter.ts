import { HttpErrorResponse, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { isClientErrorResponse, isServerErrorResponse, ServerError } from '@dnd-mapp/shared-utils';
import { catchError } from 'rxjs';
import { NotificationService, NotificationTypes } from '../notifications';

export function serverErrorInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn) {
    const notificationService = inject(NotificationService);

    return next(request).pipe(
        catchError((response: HttpErrorResponse) => {
            if (!response.ok && (isServerErrorResponse(response.status) || isClientErrorResponse(response.status))) {
                const error: ServerError = response.error
                    ? response.error
                    : {
                          error: response.statusText,
                          status: response.status,
                          message: response.message,
                          timestamp: new Date(),
                      };
                const title = `${error.error} (${error.status})`;

                notificationService.showNotification({
                    type: NotificationTypes.ERROR,
                    title: title,
                    message: error.message,
                    timestamp: new Date(error.timestamp),
                });
                throw error;
            }
            throw response;
        }),
    );
}
