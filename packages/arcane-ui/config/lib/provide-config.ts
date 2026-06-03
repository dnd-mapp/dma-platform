import { inject, provideAppInitializer, type EnvironmentProviders, type Provider } from '@angular/core';
import { CONFIG_URL } from '@dnd-mapp/arcane-ui/common';
import { ConfigService } from './config.service';

/**
 * Wires up {@link ConfigService} and an app initializer that fetches the config
 * before the application starts.
 *
 * @param url - URL of the JSON config file to fetch at bootstrap.
 *
 * @example
 * bootstrapApplication(AppComponent, {
 *   providers: [provideConfig<AppConfig>('/config.json')],
 * });
 */
export function provideConfig<T>(url: string): (Provider | EnvironmentProviders)[] {
    return [
        { provide: CONFIG_URL, useValue: url },
        ConfigService,
        provideAppInitializer(() => {
            const service = inject(ConfigService<T>);

            return service.load();
        }),
    ];
}
