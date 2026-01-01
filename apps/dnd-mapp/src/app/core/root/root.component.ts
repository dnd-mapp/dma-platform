import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcome } from '../../nx-welcome';

@Component({
    imports: [NxWelcome, RouterModule],
    selector: 'dma-root',
    templateUrl: './root.component.html',
    styleUrl: './root.component.css',
})
export class RootComponent {
    protected title = 'dnd-mapp';
}
