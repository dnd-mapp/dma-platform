import { HttpHandlerFn, HttpHeaders, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../auth';

export function authInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn) {
    const authService = inject(AuthService);

    const accessToken = authService.accessToken();

    if (!accessToken) return next(request);
    const authenticatedRequest = request.clone({
        headers: new HttpHeaders({
            authorization: `Bearer ${accessToken}`,
        }),
    });

    return next(authenticatedRequest);
}
