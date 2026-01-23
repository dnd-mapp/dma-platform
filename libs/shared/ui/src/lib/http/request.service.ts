import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RequestService {
    private readonly httpClient = inject(HttpClient);

    public get<T>(url: string) {
        return this.httpClient.get<T>(url, { observe: 'response' });
    }
}
