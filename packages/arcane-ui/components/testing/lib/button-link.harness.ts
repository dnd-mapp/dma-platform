import { ComponentHarness } from '@angular/cdk/testing';
import {
    buttonAppearanceAttr,
    ButtonAppearances,
    buttonIntentAttr,
    ButtonIntents,
    buttonSizeAttr,
    DEFAULT_BUTTON_APPEARANCE,
    DEFAULT_BUTTON_INTENT,
    type ButtonAppearance,
    type ButtonIntent,
    type ButtonSize,
} from '@dnd-mapp/arcane-ui/common';

/** Test harness for {@link ButtonLinkComponent} — targets `a[dma-button-link]` elements. */
export class ButtonLinkHarness extends ComponentHarness {
    /** CDK host selector targeting native `<a>` elements with the `dma-button-link` attribute. */
    public static readonly hostSelector = 'a[dma-button-link]';

    /** Returns `true` if the host has the CSS class corresponding to the given appearance. */
    public async hasAppearance(appearance: ButtonAppearance): Promise<boolean> {
        return (await this.host()).hasClass(buttonAppearanceAttr(appearance));
    }

    /** Returns `true` if the host has the CSS class corresponding to the given intent. */
    public async hasIntent(intent: ButtonIntent): Promise<boolean> {
        return (await this.host()).hasClass(buttonIntentAttr(intent));
    }

    /** Returns `true` if the host has the CSS class corresponding to the given size. */
    public async hasSize(size: ButtonSize): Promise<boolean> {
        return (await this.host()).hasClass(buttonSizeAttr(size));
    }

    /** Returns `true` if the link is in icon-only mode (the `icon-only` CSS class is present). */
    public async isIconOnly(): Promise<boolean> {
        return (await this.host()).hasClass('icon-only');
    }

    /** Returns `true` if the link stretches to fill its container (the `full-width` CSS class is present). */
    public async isFullWidth(): Promise<boolean> {
        return (await this.host()).hasClass('full-width');
    }

    /**
     * Returns `true` if the link is disabled.
     *
     * Because `<a>` has no native `disabled` property, disabled state is expressed via
     * `aria-disabled="true"` on the host element.
     */
    public async isDisabled(): Promise<boolean> {
        return (await this.host()).getAttribute('aria-disabled').then((v) => v === 'true');
    }

    /** Clicks the link. */
    public async click(): Promise<void> {
        return (await this.host()).click();
    }

    /** Returns the trimmed text content of the link. */
    public async getText(): Promise<string> {
        return (await this.host()).text();
    }

    /**
     * Returns the active {@link ButtonAppearance} by inspecting the host's CSS classes.
     * Falls back to {@link DEFAULT_BUTTON_APPEARANCE} when no recognised class is found.
     */
    public async getAppearance(): Promise<ButtonAppearance> {
        const host = await this.host();
        for (const appearance of Object.values(ButtonAppearances)) {
            if (await host.hasClass(buttonAppearanceAttr(appearance))) {
                return appearance;
            }
        }
        return DEFAULT_BUTTON_APPEARANCE;
    }

    /**
     * Returns the active {@link ButtonIntent} by inspecting the host's CSS classes.
     * Falls back to {@link DEFAULT_BUTTON_INTENT} when no recognised class is found.
     */
    public async getIntent(): Promise<ButtonIntent> {
        const host = await this.host();
        for (const intent of Object.values(ButtonIntents)) {
            if (await host.hasClass(buttonIntentAttr(intent))) {
                return intent;
            }
        }
        return DEFAULT_BUTTON_INTENT;
    }
}
