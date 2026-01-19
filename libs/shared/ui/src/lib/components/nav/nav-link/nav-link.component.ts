import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'li[dma-nav-link]',
    templateUrl: './nav-link.component.html',
    styleUrl: './nav-link.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class]': `'cursor-pointer'`,
    },
    imports: [RouterLink, RouterLinkActive],
})
export class NavLinkComponent {
    public readonly route = input.required<string>();
}
