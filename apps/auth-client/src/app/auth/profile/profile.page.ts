import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'dma-profile',
    templateUrl: './profile.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [],
})
export class ProfilePage {}
