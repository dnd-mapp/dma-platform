import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'button[dma-button]',
    templateUrl: './button.component.html',
    styleUrl: './button.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {}
