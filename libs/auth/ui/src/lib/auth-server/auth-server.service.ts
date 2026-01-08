import { inject, Injectable } from '@angular/core';
import { RequestService } from '@dnd-mapp/shared/ui';

@Injectable({ providedIn: 'root' })
export class AuthServerService {
    private readonly requestService = inject(RequestService);

    // TODO - Read the base URL for the Auth server from a configuration file
    private baseUrl = new URL('https://localhost.auth.dndmapp.dev:4350');

    public get<Response>(endPoint: string, params?: URLSearchParams) {
        return this.requestService.get<Response>(new URL(endPoint, this.baseUrl), params);
    }
}
