import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { IconSize } from '@dnd-mapp/arcane-ui/common';
import {
    ArrowUpRightFromSquareIconComponent,
    CheckIconComponent,
    ExclamationCircleIconComponent,
    PenIconComponent,
    PlusIconComponent,
    SpinnerIconComponent,
    TrashIconComponent,
} from '@dnd-mapp/arcane-ui/icons';

@Component({
    selector: 'dma-icon-gallery',
    templateUrl: './icon-gallery.component.html',
    styleUrl: './icon-gallery.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ArrowUpRightFromSquareIconComponent,
        CheckIconComponent,
        ExclamationCircleIconComponent,
        PenIconComponent,
        PlusIconComponent,
        SpinnerIconComponent,
        TrashIconComponent,
    ],
})
export class IconGalleryComponent {
    public readonly size = input<IconSize>();
}
