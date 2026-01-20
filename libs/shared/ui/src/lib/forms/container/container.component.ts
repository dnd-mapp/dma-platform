import { NgTemplateOutlet } from '@angular/common';
import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    computed,
    contentChild,
    input,
    signal,
} from '@angular/core';
import { LeadingIconDirective } from '@dnd-mapp/shared-ui';

@Component({
    selector: 'dma-container',
    templateUrl: './container.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class]': `'inline-flex gap-2 border rounded-md'`,
        '[class.border-neutral-400]': '!hover() && !focus()',
        '[class.border-neutral-900]': 'isHovered()',
        '[class.border-blue-400]': 'isFocused()',
        '[class.outline-blue-400]': 'isFocused()',
        '[class.outline]': 'isFocused()',
        '[class.opacity-33]': 'disabled()',
        '(mouseenter)': 'onMouseenter()',
        '(mouseleave)': 'onMouseleave()',
    },
    imports: [NgTemplateOutlet],
})
export class ContainerComponent {
    public readonly focus = input(false, { transform: booleanAttribute });

    public readonly disabled = input(false, { transform: booleanAttribute });

    protected readonly hover = signal(false);

    protected readonly hasLeadingIcon = computed(() => Boolean(this.leadingIcon()));

    protected readonly isFocused = computed(() => this.focus() && !this.disabled());

    protected readonly isHovered = computed(() => this.hover() && !this.focus() && !this.disabled());

    private readonly leadingIcon = contentChild(LeadingIconDirective);

    protected onMouseenter() {
        if (this.disabled()) return;
        this.hover.set(true);
    }

    protected onMouseleave() {
        if (this.disabled()) return;
        this.hover.set(false);
    }
}
