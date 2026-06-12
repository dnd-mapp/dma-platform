import { ComponentHarness } from '@angular/cdk/testing';
import {
    buttonAppearanceAttr,
    buttonIntentAttr,
    buttonSizeAttr,
    type ButtonAppearance,
    type ButtonIntent,
    type ButtonSize,
} from '@dnd-mapp/arcane-ui/common';

export class ButtonLinkHarness extends ComponentHarness {
    public static readonly hostSelector = 'a[dma-button-link]';

    public async hasAppearance(appearance: ButtonAppearance): Promise<boolean> {
        return (await this.host()).hasClass(buttonAppearanceAttr(appearance));
    }

    public async hasIntent(intent: ButtonIntent): Promise<boolean> {
        return (await this.host()).hasClass(buttonIntentAttr(intent));
    }

    public async hasSize(size: ButtonSize): Promise<boolean> {
        return (await this.host()).hasClass(buttonSizeAttr(size));
    }

    public async isIconOnly(): Promise<boolean> {
        return (await this.host()).hasClass('icon-only');
    }

    public async isFullWidth(): Promise<boolean> {
        return (await this.host()).hasClass('full-width');
    }

    public async isDisabled(): Promise<boolean> {
        return (await this.host()).getAttribute('aria-disabled').then((v) => v === 'true');
    }
}
