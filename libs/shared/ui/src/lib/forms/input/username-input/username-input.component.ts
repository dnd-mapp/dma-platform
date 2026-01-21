import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { SoUserIconComponent } from '../../../icons';
import { InvalidMessageDirective } from '../../invalid-message';
import { LeadingIconDirective } from '../../leading-icon';
import { NgTouched, NgValueChange } from '../../types';
import { InputComponent } from '../input.component';

@Component({
    selector: 'dma-username-input',
    templateUrl: './username-input.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [InputComponent, SoUserIconComponent, LeadingIconDirective, InvalidMessageDirective],
})
export class UsernameInputComponent implements ControlValueAccessor, OnInit {
    private readonly control = inject(NgControl, { self: true, optional: true });
    private readonly destroyRef = inject(DestroyRef);

    private ngTouched: NgTouched | undefined;
    private ngChanged: NgValueChange<string> | undefined;

    protected readonly value = signal('');

    protected readonly disabled = signal(false);

    protected readonly valid = signal(false);

    protected readonly invalid = signal(false);

    protected readonly hasRequiredError = signal(false);

    public constructor() {
        this.setValueAccessor();
    }

    public ngOnInit() {
        this.listenToValueChanges();
    }

    public writeValue(value: string) {
        this.value.set(value);
    }

    public registerOnTouched(fn: NgTouched) {
        this.ngTouched = fn;
    }

    public registerOnChange(fn: NgValueChange<string>) {
        this.ngChanged = fn;
    }

    public setDisabledState(isDisabled: boolean) {
        this.disabled.set(isDisabled);
    }

    protected onValueChange(value: string) {
        if (!this.ngChanged) return;
        this.ngChanged(value);
    }

    protected onFocusChange(focussed: boolean) {
        if (!this.ngTouched || !focussed) return;
        this.ngTouched();
    }

    private setValueAccessor() {
        if (this.control === null) return;
        this.control.valueAccessor = this;
    }

    private listenToValueChanges() {
        if (this.control === null || this.control.statusChanges === null) return;
        this.control.statusChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (status) => {
                this.valid.set(status === 'VALID');
                this.invalid.set(status === 'INVALID');

                this.hasRequiredError.set(this.control?.hasError('required') === true);
            },
        });
    }
}
