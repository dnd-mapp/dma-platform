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
import { LeadingIconDirective } from '../leading-icon';

@Component({
    selector: 'dma-container',
    templateUrl: './container.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class]': `'flex items-center gap-2 border rounded-md w-full'`,
        '[class.border-neutral-400]': '!hover() && !focus() && !valid() && !invalid()',
        '[class.border-neutral-900]': 'isHovered()',
        '[class.border-blue-400]': 'isFocused()',
        '[class.outline]': 'isFocused()',
        '[class.outline-blue-400]': 'isFocused()',
        '[class.border-emerald-500]': 'isValid()',
        '[class.outline-emerald-500]': 'isValid()',
        '[class.border-red-500]': 'isInvalid()',
        '[class.outline-red-500]': 'isInvalid()',
        '[class.opacity-33]': 'disabled()',
        '(mouseenter)': 'onMouseenter()',
        '(mouseleave)': 'onMouseleave()',
    },
    imports: [NgTemplateOutlet],
})
export class ContainerComponent {
    public readonly focus = input(false, { transform: booleanAttribute });

    public readonly disabled = input(false, { transform: booleanAttribute });

    public readonly valid = input(false, { transform: booleanAttribute });

    public readonly invalid = input(false, { transform: booleanAttribute });

    protected readonly hover = signal(false);

    protected readonly hasLeadingIcon = computed(() => Boolean(this.leadingIcon()));

    protected readonly isFocused = computed(() => this.focus() && !this.disabled());

    protected readonly isHovered = computed(() => this.hover() && !this.focus() && !this.disabled() && !this.valid());

    protected readonly isValid = computed(() => this.valid() && !this.disabled());

    protected readonly isInvalid = computed(() => this.invalid() && !this.disabled());

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
