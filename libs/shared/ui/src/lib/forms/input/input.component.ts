import { NgTemplateOutlet } from '@angular/common';
import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    computed,
    contentChild,
    DestroyRef,
    inject,
    input,
    OnInit,
    output,
    signal,
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { debounceTime, Subject } from 'rxjs';
import { SoCheckIconComponent, SoTriangleExclamationIconComponent } from '../../icons';
import { ActionButtonDirective } from '../action-button';
import { ContainerComponent } from '../container';
import { LeadingIconDirective } from '../leading-icon';
import { TrailingIconDirective } from '../trailing-icon';
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
    imports: [
        NgTemplateOutlet,
        ContainerComponent,
        LeadingIconDirective,
        TrailingIconDirective,
        ActionButtonDirective,
        SoCheckIconComponent,
        SoTriangleExclamationIconComponent,
    ],
})
export class InputComponent implements ControlValueAccessor, OnInit {
    private readonly destroyRef = inject(DestroyRef);
    private readonly control = inject(NgControl, { self: true, optional: true });

    public readonly inputId = input.required<string>();

    public readonly label = input.required<string>();

    public readonly placeholder = input<string>('');

    public readonly value = input<string>('');

    public readonly valueChange = output<string>();

    public readonly disabled = input(false, { transform: booleanAttribute });

    public readonly inputType = input(DEFAULT_INPUT_TYPE, { transform: inputTypeAttribute });

    public readonly valid = input(false, { transform: booleanAttribute });

    public readonly invalid = input(false, { transform: booleanAttribute });

    public readonly focusChange = output<boolean>();

    protected readonly focus = signal(false);

    protected readonly _value = signal<string>('');

    protected readonly _disabled = signal(false);

    protected readonly _valid = signal(false);

    protected readonly _invalid = signal(false);

    protected readonly hasLeadingIcon = computed(() => Boolean(this.leadingIcon()));

    protected readonly hasTrailingIcon = computed(() => Boolean(this.trailingIcon()));

    protected readonly hasActionButton = computed(() => Boolean(this.actionButton()));

    private readonly inputSubject = new Subject<string>();

    private readonly leadingIcon = contentChild(LeadingIconDirective);

    private readonly trailingIcon = contentChild(TrailingIconDirective);

    private readonly actionButton = contentChild(ActionButtonDirective);

    private ngTouched: NgTouched | undefined;
    private ngChanged: NgValueChange<string> | undefined;

    public constructor() {
        toObservable(this.value)
            .pipe(takeUntilDestroyed())
            .subscribe({
                next: (value) => this._value.set(value),
            });

        toObservable(this.valid)
            .pipe(takeUntilDestroyed())
            .subscribe({
                next: (valid) => this._valid.set(valid),
            });

        toObservable(this.invalid)
            .pipe(takeUntilDestroyed())
            .subscribe({
                next: (invalid) => this._invalid.set(invalid),
            });

        this.inputSubject
            .asObservable()
            .pipe(debounceTime(INPUT_DEBOUNCE_MS), takeUntilDestroyed())
            .subscribe({
                next: (value) => this.onValueChange(value),
            });

        this.setValueAccessor();
    }

    public ngOnInit() {
        this.listenToStatusChanges();
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

    private setValueAccessor() {
        if (this.control === null) return;
        this.control.valueAccessor = this;
    }

    private listenToStatusChanges() {
        if (this.control === null || this.control.statusChanges === null) return;
        this.control.statusChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (status) => {
                this._valid.set(status === 'VALID');
                this._invalid.set(status === 'INVALID');
            },
        });
    }
}
