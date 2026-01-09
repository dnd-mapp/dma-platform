import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
    selector: 'dma-control-container',
    templateUrl: './control-container.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class]': `'block w-full rounded-md border p-1 px-2'`,
        '[class.border-neutral-400]': '!focussed()',
        '[class.border-neutral-700]': '!focussed() && hovered()',
        '[class.border-blue-400]': 'focussed()',
        '[class.outline]': 'focussed()',
        '[class.outline-blue-400]': 'focussed()',
        '(mouseenter)': 'onMouseenter()',
        '(mouseleave)': 'onMouseleave()',
    },
    imports: [],
})
export class ControlContainerComponent {
    public readonly focussed = input(false);

    public readonly disabled = input(false);

    public readonly hovered = signal(false);

    protected onMouseenter() {
        this.hovered.set(true);
    }

    protected onMouseleave() {
        this.hovered.set(false);
    }
}
