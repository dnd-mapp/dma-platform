import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'dma-root',
    templateUrl: './root.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [],
})
export class RootComponent {}
