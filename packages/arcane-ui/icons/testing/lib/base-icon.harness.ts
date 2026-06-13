import { ComponentHarness } from '@angular/cdk/testing';
import { type IconSize } from '@dnd-mapp/arcane-ui/common';

/** Abstract base harness shared by all icon component harnesses. */
export abstract class BaseIconHarness extends ComponentHarness {
    /** Locator for all `<svg>` elements within the icon host. */
    protected readonly svgLocator = this.locatorForAll('svg');

    /** Returns `true` if `aria-hidden="true"` is set on the host element. */
    public async isAriaHidden(): Promise<boolean> {
        return (await (await this.host()).getAttribute('aria-hidden')) === 'true';
    }

    /** Returns `true` if the host has the CSS class corresponding to the given size. */
    public async hasSize(size: IconSize): Promise<boolean> {
        return (await this.host()).hasClass(size);
    }

    /** Returns `true` if at least one `<svg>` element is rendered inside the host. */
    public async hasSvg(): Promise<boolean> {
        return (await this.svgLocator()).length > 0;
    }
}
