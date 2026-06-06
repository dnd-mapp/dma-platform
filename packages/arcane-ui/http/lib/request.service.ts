import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Typed wrapper around Angular's {@link HttpClient}.
 *
 * Methods accept any full URL and return a typed `Observable`. Must be provided
 * explicitly — use {@link provideHttpClient} alongside this service in your providers.
 *
 * @example
 * bootstrapApplication(AppComponent, {
 *   providers: [RequestService, provideHttpClient()],
 * });
 */
@Injectable({ providedIn: null })
export class RequestService {
    private readonly httpClient = inject(HttpClient);

    /** Sends a GET request to `url` and returns the typed response body. */
    public get<T>(url: string): Observable<T> {
        return this.httpClient.get<T>(url);
    }

    /** Sends a POST request to `url` with `body` and returns the typed response body. */
    public post<T, B = unknown>(url: string, body: B): Observable<T> {
        return this.httpClient.post<T>(url, body);
    }

    /** Sends a PUT request to `url` with `body` and returns the typed response body. */
    public put<T, B = unknown>(url: string, body: B): Observable<T> {
        return this.httpClient.put<T>(url, body);
    }

    /** Sends a PATCH request to `url` with `body` and returns the typed response body. */
    public patch<T, B = unknown>(url: string, body: B): Observable<T> {
        return this.httpClient.patch<T>(url, body);
    }

    /** Sends a DELETE request to `url` and returns the typed response body. */
    public delete<T>(url: string): Observable<T> {
        return this.httpClient.delete<T>(url);
    }
}
