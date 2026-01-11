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

    public redirect(url: URL, params?: URLSearchParams) {
        if (params) {
            url.search = params.toString();
        }
        location.href = url.toString();
    }

    public post<ResponseBody, RequestBody>(url: URL, data: RequestBody) {
        return this.httpClient.post<ResponseBody>(url.toString(), data, { observe: 'response' });
    }
}
