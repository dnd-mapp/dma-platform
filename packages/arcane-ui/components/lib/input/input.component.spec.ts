import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTypes, type InputType } from '@dnd-mapp/arcane-ui/common';
import { InputHarness } from '@dnd-mapp/arcane-ui/components/testing';
import { setupTestEnvironment } from '@dnd-mapp/arcane-ui/testing';
import { type InputStatus } from './base-input.component';
import { InputComponent } from './input.component';

describe('InputComponent', () => {
    @Component({
        selector: 'dma-test-host',
        imports: [InputComponent],
        template: `
            <dma-input
                inputId="name"
                [label]="label()"
                [type]="type()"
                [required]="required()"
                [placeholder]="placeholder()"
                [disabled]="disabled()"
                [status]="status()"
                [helperText]="helperText()"
                [errorMessage]="errorMessage()"
            />
        `,
    })
    class TestHostComponent {
        public readonly label = signal('Name');
        public readonly type = signal<InputType>('text');
        public readonly required = signal(false);
        public readonly placeholder = signal<string | undefined>(undefined);
        public readonly disabled = signal(false);
        public readonly status = signal<InputStatus | undefined>(undefined);
        public readonly helperText = signal<string | undefined>(undefined);
        public readonly errorMessage = signal<string | undefined>(undefined);
    }

    @Component({
        selector: 'dma-test-form-host',
        imports: [InputComponent, ReactiveFormsModule],
        template: ` <dma-input inputId="character-name" label="Character name" [formControl]="control" /> `,
    })
    class TestFormHostComponent {
        public readonly control = new FormControl('', {
            nonNullable: true,
            validators: Validators.required,
        });
    }

    async function setup() {
        const { fixture, harness } = await setupTestEnvironment({
            testComponent: TestHostComponent,
            harness: InputHarness,
        });
        return { host: fixture!.componentInstance, harness: harness! };
    }

    async function setupForm() {
        const { fixture, harness } = await setupTestEnvironment({
            testComponent: TestFormHostComponent,
            harness: InputHarness,
        });
        return { host: fixture!.componentInstance, harness: harness! };
    }

    describe('type', () => {
        it('defaults to "text"', async () => {
            const { harness } = await setup();
            expect(await harness.getType()).toBe('text');
        });

        it.each(Object.values(InputTypes))('forwards type "%s" to the native input', async (type) => {
            const { host, harness } = await setup();
            host.type.set(type);
            expect(await harness.getType()).toBe(type);
        });
    });

    describe('label', () => {
        it('renders the label text', async () => {
            const { harness } = await setup();
            expect(await harness.getLabel()).toBe('Name');
        });
    });

    describe('aria-required', () => {
        it('is absent when required is false', async () => {
            const { harness } = await setup();
            expect(await harness.isRequired()).toBe(false);
        });

        it('is present when required is true', async () => {
            const { host, harness } = await setup();
            host.required.set(true);
            expect(await harness.isRequired()).toBe(true);
        });
    });

    describe('aria-invalid', () => {
        it('is absent when status is not error', async () => {
            const { host, harness } = await setup();
            host.status.set('success');
            expect(await harness.isInvalid()).toBe(false);
        });

        it('is present when status is error', async () => {
            const { host, harness } = await setup();
            host.status.set('error');
            expect(await harness.isInvalid()).toBe(true);
        });
    });

    describe('status icons', () => {
        it('renders no icon in the default state', async () => {
            const { harness } = await setup();
            expect(await harness.hasCheckIcon()).toBe(false);
            expect(await harness.hasExclamationCircleIcon()).toBe(false);
        });

        it('renders the check icon on success', async () => {
            const { host, harness } = await setup();
            host.status.set('success');
            expect(await harness.hasCheckIcon()).toBe(true);
            expect(await harness.hasExclamationCircleIcon()).toBe(false);
        });

        it('renders the exclamation-circle icon on error', async () => {
            const { host, harness } = await setup();
            host.status.set('error');
            expect(await harness.hasCheckIcon()).toBe(false);
            expect(await harness.hasExclamationCircleIcon()).toBe(true);
        });
    });

    describe('helper text', () => {
        it('is not rendered when helperText is absent', async () => {
            const { harness } = await setup();
            expect(await harness.getHelperText()).toBeNull();
        });

        it('renders helper text when provided', async () => {
            const { host, harness } = await setup();
            host.helperText.set('Enter your full name');
            expect(await harness.getHelperText()).toBe('Enter your full name');
        });

        it('includes the helper text ID in aria-describedby', async () => {
            const { host, harness } = await setup();
            host.helperText.set('Some hint');
            expect(await harness.getAriaDescribedBy()).toContain('name-helper');
        });
    });

    describe('error message', () => {
        it('is not rendered in the default state', async () => {
            const { host, harness } = await setup();
            host.errorMessage.set('This field is required');
            expect(await harness.getErrorMessage()).toBeNull();
        });

        it('renders the error message when status is error', async () => {
            const { host, harness } = await setup();
            host.status.set('error');
            host.errorMessage.set('This field is required');
            expect(await harness.getErrorMessage()).toBe('This field is required');
        });

        it('has role="alert" on the error message container', async () => {
            const { host, harness } = await setup();
            host.status.set('error');
            host.errorMessage.set('Required');
            expect(await harness.errorMessageHasAlertRole()).toBe(true);
        });

        it('includes the error message ID in aria-describedby when status is error', async () => {
            const { host, harness } = await setup();
            host.status.set('error');
            host.errorMessage.set('Required');
            expect(await harness.getAriaDescribedBy()).toContain('name-error');
        });
    });

    describe('aria-describedby', () => {
        it('is absent when there is no helper text or error message', async () => {
            const { harness } = await setup();
            expect(await harness.getAriaDescribedBy()).toBeNull();
        });

        it('references both helper text and error message IDs when both apply', async () => {
            const { host, harness } = await setup();
            host.status.set('error');
            host.helperText.set('Hint');
            host.errorMessage.set('Required');
            const describedBy = await harness.getAriaDescribedBy();
            expect(describedBy).toContain('name-helper');
            expect(describedBy).toContain('name-error');
        });
    });

    describe('disabled', () => {
        it('is not disabled by default', async () => {
            const { harness } = await setup();
            expect(await harness.isDisabled()).toBe(false);
        });

        it('applies the disabled class when disabled is true', async () => {
            const { host, harness } = await setup();
            host.disabled.set(true);
            expect(await harness.isDisabled()).toBe(true);
        });

        it('receives disabled state from Angular forms', async () => {
            const { host, harness } = await setupForm();
            host.control.disable();
            expect(await harness.isDisabled()).toBe(true);
        });
    });

    describe('form integration', () => {
        it('propagates user-entered values to Angular forms', async () => {
            const { host, harness } = await setupForm();
            await harness.setValue('Frodo');
            expect(host.control.value).toBe('Frodo');
        });

        it('marks the form control as touched on blur', async () => {
            const { host, harness } = await setupForm();
            await harness.blur();
            expect(host.control.touched).toBe(true);
        });
    });
});
