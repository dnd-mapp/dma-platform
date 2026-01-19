import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'dma-characters-overview',
    templateUrl: './characters-overview.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [],
})
export class CharactersOverviewPage {}
