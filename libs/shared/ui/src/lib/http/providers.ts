import { HttpInterceptorFn, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

export function provideHttp(...interceptors: HttpInterceptorFn[]) {
    return provideHttpClient(withFetch(), withInterceptors([...interceptors]));
}
