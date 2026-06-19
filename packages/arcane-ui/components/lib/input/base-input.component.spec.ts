import { ComponentHarness } from '@angular/cdk/testing';
import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { setupTestEnvironment } from '@dnd-mapp/arcane-ui/testing';
import { BaseInputComponent, type InputStatus } from './base-input.component';

describe('BaseInputComponent', () => {
    @Component({
        selector: 'dma-test-input',
        template: `
            <label [for]="inputId()">{{ label() }}</label>
            <input
                [id]="inputId()"
                [value]="value() ?? ''"
                [disabled]="effectiveDisabled()"
                [attr.data-status]="effectiveStatus()"
                (input)="updateValue($any($event.target).value)"
                (blur)="markAsTouched()"
            />
            <span class="helper-text" [id]="helperTextId()"></span>
            <span class="error-message" [id]="errorMessageId()"></span>
        `,
    })
    class TestInputComponent extends BaseInputComponent<string> {}

    @Component({
        selector: 'dma-test-standalone-host',
        imports: [TestInputComponent],
        template: `<dma-test-input inputId="name" label="Name" [disabled]="disabled()" />`,
    })
    class TestStandaloneHostComponent {
        public readonly disabled = signal(false);
    }

    class TestInputHarness extends ComponentHarness {
        public static readonly hostSelector = 'dma-test-input';

        private readonly input = this.locatorFor('input');
        private readonly label = this.locatorFor('label');
        private readonly helperText = this.locatorFor('.helper-text');
        private readonly errorMessage = this.locatorFor('.error-message');

        public async getValue(): Promise<string> {
            return (await this.input()).getProperty<string>('value');
        }

        public async setValue(value: string): Promise<void> {
            const input = await this.input();
            await input.setInputValue(value);
            await input.dispatchEvent('input');
        }

        public async blur(): Promise<void> {
            await (await this.input()).blur();
        }

        public async isDisabled(): Promise<boolean> {
            return (await this.input()).getProperty<boolean>('disabled');
        }

        public async getStatus(): Promise<InputStatus> {
            return (await (await this.input()).getAttribute('data-status')) as InputStatus;
        }

        public async getInputId(): Promise<string | null> {
            return (await this.input()).getAttribute('id');
        }

        public async getLabel(): Promise<string> {
            return (await this.label()).text();
        }

        public async getLabelFor(): Promise<string | null> {
            return (await this.label()).getAttribute('for');
        }

        public async getHelperTextId(): Promise<string | null> {
            return (await this.helperText()).getAttribute('id');
        }

        public async getErrorMessageId(): Promise<string | null> {
            return (await this.errorMessage()).getAttribute('id');
        }
    }

    @Component({
        selector: 'dma-test-host',
        imports: [ReactiveFormsModule, TestInputComponent],
        template: `
            <dma-test-input
                inputId="character-name"
                label="Character name"
                [formControl]="control"
                [status]="status()"
            />
        `,
    })
    class TestHostComponent {
        public readonly control = new FormControl('', {
            nonNullable: true,
            validators: Validators.required,
        });
        public readonly status = signal<InputStatus | undefined>(undefined);
    }

    async function setupStandaloneInput() {
        const { fixture, harness } = await setupTestEnvironment({
            testComponent: TestStandaloneHostComponent,
            harness: TestInputHarness,
        });

        return {
            harness: harness!,
            host: fixture!.componentInstance,
        };
    }

    async function setupFormInput() {
        const { fixture, harness } = await setupTestEnvironment({
            testComponent: TestHostComponent,
            harness: TestInputHarness,
        });

        return {
            harness: harness!,
            host: fixture!.componentInstance,
        };
    }

    it('writes model values from Angular forms to the input', async () => {
        const { harness, host } = await setupFormInput();

        host.control.setValue('Gandalf');

        expect(await harness.getValue()).toBe('Gandalf');
    });

    it('propagates user-entered values to Angular forms', async () => {
        const { harness, host } = await setupFormInput();

        await harness.setValue('Shadowfax');

        expect(await harness.getValue()).toBe('Shadowfax');
        expect(host.control.value).toBe('Shadowfax');
    });

    it('marks the Angular form control as touched on blur', async () => {
        const { harness, host } = await setupFormInput();

        await harness.blur();

        expect(host.control.touched).toBe(true);
    });

    it('receives disabled state from Angular forms', async () => {
        const { harness, host } = await setupFormInput();

        expect(await harness.isDisabled()).toBe(false);

        host.control.disable();
        expect(await harness.isDisabled()).toBe(true);

        host.control.enable();
        expect(await harness.isDisabled()).toBe(false);
    });

    it('supports an explicit disabled input without Angular forms', async () => {
        const { harness, host } = await setupStandaloneInput();

        host.disabled.set(true);
        expect(await harness.isDisabled()).toBe(true);
    });

    it('exposes required inputs and derives stable description IDs', async () => {
        const { harness } = await setupStandaloneInput();

        expect(await harness.getInputId()).toBe('name');
        expect(await harness.getLabel()).toBe('Name');
        expect(await harness.getLabelFor()).toBe('name');
        expect(await harness.getHelperTextId()).toBe('name-helper');
        expect(await harness.getErrorMessageId()).toBe('name-error');
    });

    it('defaults to a neutral status without an NgControl', async () => {
        const { harness } = await setupStandaloneInput();

        expect(await harness.getStatus()).toBe('default');
    });

    it('stays neutral while its invalid control is untouched and pristine', async () => {
        const { harness } = await setupFormInput();

        expect(await harness.getStatus()).toBe('default');
    });

    it('derives error from an invalid touched control', async () => {
        const { harness, host } = await setupFormInput();

        host.control.markAsTouched();

        expect(await harness.getStatus()).toBe('error');
    });

    it('derives error from an invalid dirty control', async () => {
        const { harness, host } = await setupFormInput();

        host.control.markAsDirty();

        expect(await harness.getStatus()).toBe('error');
    });

    it('derives success from a valid interacted control', async () => {
        const { harness, host } = await setupFormInput();

        host.control.setValue('Aragorn');
        host.control.markAsTouched();

        expect(await harness.getStatus()).toBe('success');
    });

    it('returns to a neutral status when the control is reset', async () => {
        const { harness, host } = await setupFormInput();
        host.control.setValue('Legolas');
        host.control.markAsTouched();
        expect(await harness.getStatus()).toBe('success');

        host.control.reset();

        expect(await harness.getStatus()).toBe('default');
    });

    it('uses an explicit status override, including default', async () => {
        const { harness, host } = await setupFormInput();
        host.control.markAsTouched();
        expect(await harness.getStatus()).toBe('error');

        host.status.set('success');
        expect(await harness.getStatus()).toBe('success');

        host.status.set('default');
        expect(await harness.getStatus()).toBe('default');
    });
});
