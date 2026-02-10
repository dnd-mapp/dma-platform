import { inject, Injectable, signal } from '@angular/core';
import { RequestService } from '@dnd-mapp/shared-ui';
import { tap } from 'rxjs';
import { ClientConfig } from './types';

@Injectable({ providedIn: 'root' })
export class ConfigService {
    private readonly requestService = inject(RequestService);

    public get config() {
        const config = this._config();

        if (config === null) throw new Error('Client config has not been initialized.');
        return config;
    }
    private readonly _config = signal<ClientConfig | null>(null);

    public initialize() {
        return this.requestService
            .get<ClientConfig>('/config.json')
            .pipe(tap((response) => this._config.set(response.body)));
    }
}
