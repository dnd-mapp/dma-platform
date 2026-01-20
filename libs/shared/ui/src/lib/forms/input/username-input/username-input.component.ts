import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { SoUserIconComponent } from '../../../icons';
import { provideValueAccessor } from '../../functions';
import { LeadingIconDirective } from '../../leading-icon';
import { NgTouched, NgValueChange } from '../../types';
import { InputComponent } from '../input.component';

@Component({
    selector: 'dma-username-input',
    templateUrl: './username-input.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [InputComponent, SoUserIconComponent, LeadingIconDirective],
    providers: [provideValueAccessor(UsernameInputComponent)],
})
export class UsernameInputComponent implements ControlValueAccessor {
    private ngTouched: NgTouched | undefined;
    private ngChanged: NgValueChange<string> | undefined;

    protected value = signal('');

    protected disabled = signal(false);

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
}
