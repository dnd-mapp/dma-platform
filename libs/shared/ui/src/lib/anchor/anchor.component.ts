import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'dma-anchor',
    templateUrl: './anchor.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterLink],
})
export class AnchorComponent {
    public readonly route = input.required<string>();

    public readonly label = input.required<string>();
}
