import { booleanAttribute, ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { ControlValueAccessor } from '@angular/forms';
import { debounceTime, Subject } from 'rxjs';
import { NgOnChange, NgOnTouched } from '../models';
import { provideValueAccessor } from '../providers';
import { DEFAULT_INPUT_TYPE, inputTypeAttribute } from './input-type';

const INPUT_DEBOUNCE_TIME = 500 as const;

@Component({
    selector: 'dma-input',
    templateUrl: './input.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [],
    providers: [provideValueAccessor(InputComponent)],
})
export class InputComponent implements ControlValueAccessor {
    public readonly label = input.required<string>();

    public readonly inputId = input.required<string>();

    public readonly inputType = input(DEFAULT_INPUT_TYPE, { transform: inputTypeAttribute });

    public readonly value = input('');

    public readonly valueChange = output<string>();

    public readonly disabled = input(false, { transform: booleanAttribute });

    public readonly placeholder = input<string>('');

    protected readonly _value = signal('');

    protected readonly _disabled = signal(false);

    private ngOnChange: NgOnChange<string>;
    private ngOnTouched: NgOnTouched;

    private inputSubject = new Subject<string>();
    private input$ = this.inputSubject.asObservable();

    public constructor() {
        toObservable(this.value)
            .pipe(takeUntilDestroyed())
            .subscribe({
                next: (value) => this._value.set(value),
            });

        toObservable(this.disabled)
            .pipe(takeUntilDestroyed())
            .subscribe({
                next: (disabled) => this._disabled.set(disabled),
            });

        this.input$.pipe(takeUntilDestroyed(), debounceTime(INPUT_DEBOUNCE_TIME)).subscribe({
            next: (value) => this.change(value),
        });
    }

    public writeValue(value: string) {
        this._value.set(value);
    }

    public registerOnChange(fn: NgOnChange<string>) {
        this.ngOnChange = fn;
    }

    public registerOnTouched(fn: NgOnTouched) {
        this.ngOnTouched = fn;
    }

    public setDisabledState(disabled: boolean) {
        this._disabled.set(disabled);
    }

    public onFocus() {
        this.ngOnTouched();
    }

    public onInput(value: string) {
        this.inputSubject.next(value);
    }

    private change(value: string) {
        this.ngOnChange(value);
        this._value.set(value);
        this.valueChange.emit(value);
    }
}
