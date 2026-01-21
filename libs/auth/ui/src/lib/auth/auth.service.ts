import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
    public readonly authenticated = signal(false);

    public authorize() {
        location.href = 'https://localhost.auth.dndmapp.dev:4350/authorize';
    }
}
