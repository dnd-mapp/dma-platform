import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { finalize } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RequestService {
    private readonly httpClient = inject(HttpClient);

    public get<ResponseBody>(url: string) {
        return this.httpClient.get<ResponseBody>(url, { observe: 'response' });
    }

    public post<RequestBody, ResponseBody = RequestBody>(url: string, data: RequestBody) {
        const processing = signal(true);
        return {
            processing: processing,
            request: this.httpClient
                .post<ResponseBody>(url, data, { observe: 'response' })
                .pipe(finalize(() => processing.set(false))),
        };
    }
}
