import { inject, Injectable } from '@angular/core';
import { CONFIG_URL } from '@dnd-mapp/arcane-ui/common';

/**
 * Fetches a JSON config file at bootstrap and exposes it as a typed singleton.
 *
 * Must be provided explicitly via {@link provideConfig} — there is no default URL.
 *
 * @example
 * bootstrapApplication(AppComponent, {
 *   providers: [provideConfig<AppConfig>('/config.json')],
 * });
 *
 * @example
 * // In a component or service:
 * readonly #config = inject(ConfigService).get() as AppConfig;
 */
@Injectable({ providedIn: null })
export class ConfigService<T> {
    private readonly url = inject(CONFIG_URL);

    private config!: T;

    /** Returns the fully loaded config object. Only call after bootstrap. */
    public get(): T {
        return this.config;
    }

    /** Fetches and stores the config. Called automatically by {@link provideConfig}. */
    public async load(): Promise<void> {
        // TODO - Use RequestService
        const response = await fetch(this.url);

        if (!response.ok) {
            throw new Error(`Config fetch failed with status ${response.status}`);
        }
        this.config = (await response.json()) as T;
    }
}
