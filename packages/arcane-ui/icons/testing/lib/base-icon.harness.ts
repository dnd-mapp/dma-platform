import { ComponentHarness } from '@angular/cdk/testing';
import { type IconSize } from '@dnd-mapp/arcane-ui/common';

export abstract class BaseIconHarness extends ComponentHarness {
    protected readonly svgLocator = this.locatorForAll('svg');

    public async isAriaHidden(): Promise<boolean> {
        return (await (await this.host()).getAttribute('aria-hidden')) === 'true';
    }

    public async hasSize(size: IconSize): Promise<boolean> {
        return (await this.host()).hasClass(size);
    }

    public async hasSvg(): Promise<boolean> {
        return (await this.svgLocator()).length > 0;
    }
}
