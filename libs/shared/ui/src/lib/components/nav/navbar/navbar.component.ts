import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'dma-navbar',
    templateUrl: './navbar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [],
})
export class NavbarComponent {}
