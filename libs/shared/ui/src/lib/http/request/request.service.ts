import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RequestService {
    private readonly httpClient = inject(HttpClient);

    public get<Response>(url: URL, params?: URLSearchParams) {
        if (params) {
            url.search = params.toString();
        }
        return this.httpClient.get<Response>(url.toString(), { observe: 'response' });
    }
}
