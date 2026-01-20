import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { ControlValueAccessor } from '@angular/forms';
import { debounceTime, Subject } from 'rxjs';
import { ContainerComponent } from '../container';
import { provideValueAccessor } from '../functions';
import { LeadingIconDirective } from '../leading-icon';
import { NgTouched, NgValueChange } from '../types';
import { DEFAULT_INPUT_TYPE, inputTypeAttribute } from './input-type';

const INPUT_DEBOUNCE_MS = 500;

@Component({
    selector: 'dma-input',
    templateUrl: './input.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class]': `'block mb-6'`,
    },
    imports: [NgTemplateOutlet, ContainerComponent, LeadingIconDirective],
    providers: [provideValueAccessor(InputComponent)],
})
export class InputComponent implements ControlValueAccessor {
    public readonly inputId = input.required<string>();

    public readonly label = input.required<string>();

    public readonly placeholder = input<string>('');

    public readonly value = input<string>('');

    public readonly valueChange = output<string>();

    public readonly disabled = input(false, { transform: booleanAttribute });

    public readonly inputType = input(DEFAULT_INPUT_TYPE, { transform: inputTypeAttribute });

    public readonly focusChange = output<boolean>();

    protected readonly focus = signal(false);

    protected readonly _value = signal<string>('');

    protected readonly _disabled = signal(false);

    private readonly inputSubject = new Subject<string>();

    private ngTouched: NgTouched | undefined;
    private ngChanged: NgValueChange<string> | undefined;

    public constructor() {
        toObservable(this.value)
            .pipe(takeUntilDestroyed())
            .subscribe({
                next: (value) => this._value.set(value),
            });

        this.inputSubject
            .asObservable()
            .pipe(debounceTime(INPUT_DEBOUNCE_MS), takeUntilDestroyed())
            .subscribe({
                next: (value) => this.onValueChange(value),
            });
    }

    public writeValue(value: string) {
        this._value.set(value);
    }

    public registerOnTouched(fn: NgTouched) {
        this.ngTouched = fn;
    }

    public registerOnChange(fn: NgValueChange<string>) {
        this.ngChanged = fn;
    }

    public setDisabledState(isDisabled: boolean) {
        this._disabled.set(isDisabled);
    }

    protected onFocus() {
        this.focus.set(true);
        this.focusChange.emit(true);

        if (this.ngTouched) {
            this.ngTouched();
        }
    }

    protected onBlur() {
        this.focus.set(false);
        this.focusChange.emit(false);
    }

    protected onInput(value: string) {
        this.inputSubject.next(value);
    }

    private onValueChange(value: string) {
        this._value.set(value);
        this.valueChange.emit(value);

        if (this.ngChanged) {
            this.ngChanged(value);
        }
    }
}
