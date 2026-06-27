import { ComponentHarness } from '@angular/cdk/testing';

/** Test harness for {@link InputComponent} — targets `dma-input` elements. */
export class InputHarness extends ComponentHarness {
    /** CDK host selector targeting `dma-input` custom elements. */
    public static readonly hostSelector = 'dma-input';

    private readonly nativeInput = this.locatorFor('.native-input');
    private readonly labelEl = this.locatorFor('label');
    private readonly checkIcon = this.locatorForOptional('dma-icon-check');
    private readonly exclamationIcon = this.locatorForOptional('dma-icon-exclamation-circle');
    private readonly helperTextEl = this.locatorForOptional('.helper-text');
    private readonly errorMessageEl = this.locatorForOptional('.error-message');

    /** Returns the current value of the native input. */
    public async getValue(): Promise<string> {
        return (await this.nativeInput()).getProperty<string>('value');
    }

    /** Sets the native input value and dispatches an `input` event. */
    public async setValue(value: string): Promise<void> {
        const input = await this.nativeInput();
        await input.setInputValue(value);
        await input.dispatchEvent('input');
    }

    /** Blurs the native input. */
    public async blur(): Promise<void> {
        await (await this.nativeInput()).blur();
    }

    /** Returns the trimmed text content of the label. */
    public async getLabel(): Promise<string> {
        return (await this.labelEl()).text();
    }

    /** Returns the `type` attribute of the native input. */
    public async getType(): Promise<string | null> {
        return (await this.nativeInput()).getAttribute('type');
    }

    /** Returns the `data-status` attribute on the host element. */
    public async getStatus(): Promise<string | null> {
        return (await this.host()).getAttribute('data-status');
    }

    /** Returns `true` if the host has the `disabled` CSS class. */
    public async isDisabled(): Promise<boolean> {
        return (await this.host()).hasClass('disabled');
    }

    /** Returns `true` if `aria-required` is set on the native input. */
    public async isRequired(): Promise<boolean> {
        return (await (await this.nativeInput()).getAttribute('aria-required')) === 'true';
    }

    /** Returns `true` if `aria-invalid` is set on the native input. */
    public async isInvalid(): Promise<boolean> {
        return (await (await this.nativeInput()).getAttribute('aria-invalid')) === 'true';
    }

    /** Returns the `aria-describedby` value from the native input, or `null` if absent. */
    public async getAriaDescribedBy(): Promise<string | null> {
        return (await this.nativeInput()).getAttribute('aria-describedby');
    }

    /** Returns `true` if the check icon (success state) is rendered in the status slot. */
    public async hasCheckIcon(): Promise<boolean> {
        return (await this.checkIcon()) !== null;
    }

    /** Returns `true` if the exclamation-circle icon (error state) is rendered in the status slot. */
    public async hasExclamationCircleIcon(): Promise<boolean> {
        return (await this.exclamationIcon()) !== null;
    }

    /** Returns the trimmed text content of the helper-text element, or `null` if absent. */
    public async getHelperText(): Promise<string | null> {
        const el = await this.helperTextEl();
        return el ? el.text() : null;
    }

    /** Returns the trimmed text content of the error-message element, or `null` if absent. */
    public async getErrorMessage(): Promise<string | null> {
        const el = await this.errorMessageEl();
        return el ? el.text() : null;
    }

    /** Returns `true` if the error-message container has `role="alert"`. */
    public async errorMessageHasAlertRole(): Promise<boolean> {
        const el = await this.errorMessageEl();
        return el !== null && (await el.getAttribute('role')) === 'alert';
    }
}
