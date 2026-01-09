import { NgTemplateOutlet } from '@angular/common';
import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    computed,
    contentChild,
    input,
    output,
    signal,
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { ControlValueAccessor } from '@angular/forms';
import { debounceTime, Subject } from 'rxjs';
import { ControlContainerComponent } from '../control-container';
import { LeadingIconDirective } from '../leading-icon';
import { NgOnChange, NgOnTouched } from '../models';
import { provideValueAccessor } from '../providers';
import { DEFAULT_INPUT_TYPE, inputTypeAttribute } from './input-type';

const INPUT_DEBOUNCE_TIME = 500 as const;

@Component({
    selector: 'dma-input',
    templateUrl: './input.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ControlContainerComponent, LeadingIconDirective, NgTemplateOutlet],
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

    protected readonly focussed = signal(false);

    protected readonly showLeadingIcon = computed(() => this.leadingIcon() !== undefined);

    private ngOnChange: NgOnChange<string>;
    private ngOnTouched: NgOnTouched;

    private inputSubject = new Subject<string>();
    private input$ = this.inputSubject.asObservable();

    private readonly leadingIcon = contentChild(LeadingIconDirective);

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
        this.focussed.set(true);
        this.ngOnTouched();
    }

    public onInput(value: string) {
        this.inputSubject.next(value);
    }

    protected onBlur() {
        this.focussed.set(false);
    }

    private change(value: string) {
        this.ngOnChange(value);
        this._value.set(value);
        this.valueChange.emit(value);
    }
}
