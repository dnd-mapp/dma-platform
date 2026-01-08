import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'dma-ui',
    templateUrl: './ui.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [],
})
export class UiComponent {}
