import { inject, Injectable } from '@angular/core';
import { RequestService } from '@dnd-mapp/shared/ui';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthServerService {
    private readonly requestService = inject(RequestService);

    // TODO - Read the base URL for the Auth server from a configuration file
    private baseUrl = new URL('https://localhost.auth.dndmapp.dev:4350');

    public get<ResponseBody>(endPoint: string, params?: URLSearchParams) {
        return this.requestService
            .get<ResponseBody>(new URL(endPoint, this.baseUrl), params)
            .pipe(map((response) => response.body));
    }

    public redirect(endPoint: string, params?: URLSearchParams) {
        this.requestService.redirect(new URL(endPoint, this.baseUrl), params);
    }

    public post<ResponseBody, RequestBody>(endPoint: string, data: RequestBody) {
        return this.requestService
            .post<ResponseBody, RequestBody>(new URL(endPoint, this.baseUrl), data)
            .pipe(map((response) => response.body!));
    }
}
