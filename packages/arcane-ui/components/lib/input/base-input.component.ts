import { afterNextRender, computed, DestroyRef, Directive, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgControl, type ControlValueAccessor } from '@angular/forms';

/** Visual validation states shared by Arcane UI input components. */
export type InputStatus = 'default' | 'error' | 'success';

/**
 * Shared value-accessor and validation-state foundation for Arcane UI inputs.
 *
 * Concrete input components are responsible for rendering the native control and
 * forwarding user interactions through {@link updateValue} and {@link markAsTouched}.
 */
@Directive()
export abstract class BaseInputComponent<TValue> implements ControlValueAccessor {
    private readonly ngControl = inject(NgControl, { optional: true, self: true });
    private readonly destroyRef = inject(DestroyRef);
    private readonly formDisabled = signal(false);
    private readonly controlStateRevision = signal(0);

    /** ID applied to the native input and used to derive related ARIA IDs. */
    public readonly inputId = input.required<string>();

    /** Visible label associated with the native input. */
    public readonly label = input.required<string>();

    /** Whether the input is required. */
    public readonly required = input(false);

    /** Placeholder forwarded to the native input. */
    public readonly placeholder = input<string>();

    /** Autocomplete hint forwarded to the native input. */
    public readonly autocomplete = input<string>();

    /** Whether the input is read-only. */
    public readonly readonly = input(false);

    /** Whether the consumer has explicitly disabled the input. */
    public readonly disabled = input(false);

    /** Supporting text rendered alongside the input. */
    public readonly helperText = input<string>();

    /** Validation error text rendered alongside the input. */
    public readonly errorMessage = input<string>();

    /** Explicit status override. When omitted, status is derived from Angular forms. */
    public readonly status = input<InputStatus>();

    /** Stable ID for the helper-text element. */
    public readonly helperTextId = computed(() => `${this.inputId()}-helper`);

    /** Stable ID for the error-message element. */
    public readonly errorMessageId = computed(() => `${this.inputId()}-error`);

    /** Current value rendered by the concrete input component. */
    protected readonly value = signal<TValue | null>(null);

    /** Effective disabled state from either the input binding or Angular forms. */
    protected readonly effectiveDisabled = computed(() => this.disabled() || this.formDisabled());

    /** Explicit or form-derived validation status. */
    protected readonly effectiveStatus = computed<InputStatus>(() => {
        this.controlStateRevision();

        const explicitStatus = this.status();

        if (explicitStatus !== undefined) {
            return explicitStatus;
        }
        const control = this.ngControl?.control;

        if (!control || (!control.touched && !control.dirty)) {
            return 'default';
        }
        if (control.invalid) {
            return 'error';
        }
        if (control.valid) {
            return 'success';
        }
        return 'default';
    });

    /** Callback registered by Angular forms for value changes. */
    protected onChange: (value: TValue | null) => void = () => undefined;

    /** Callback registered by Angular forms for touch events. */
    protected onTouched: () => void = () => undefined;

    public constructor() {
        if (this.ngControl) {
            this.ngControl.valueAccessor = this;
        }

        afterNextRender(() => {
            this.ngControl?.control?.events.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
                this.controlStateRevision.update((revision) => revision + 1);
            });
        });
    }

    /** Receives model values from Angular forms without notifying the model again. */
    public writeValue(value: TValue | null): void {
        this.value.set(value);
    }

    /** Registers the callback used to propagate user-entered values. */
    public registerOnChange(fn: (value: TValue | null) => void): void {
        this.onChange = fn;
    }

    /** Registers the callback used to mark the form control as touched. */
    public registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    /** Receives disabled-state changes from Angular forms. */
    public setDisabledState(isDisabled: boolean): void {
        this.formDisabled.set(isDisabled);
    }

    /** Updates the rendered value and propagates a user-originated change. */
    protected updateValue(value: TValue | null): void {
        this.value.set(value);
        this.onChange(value);
    }

    /** Marks the concrete input as touched. */
    protected markAsTouched(): void {
        this.onTouched();
    }
}
