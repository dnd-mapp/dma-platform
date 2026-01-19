import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'dma-nav-brand',
    templateUrl: './nav-brand.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterLink],
})
export class NavBrandComponent {
    public readonly appName = input.required<string>();
}
