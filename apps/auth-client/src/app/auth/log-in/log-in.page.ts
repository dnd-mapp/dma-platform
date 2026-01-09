import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AnchorComponent, ButtonComponent, InputComponent } from '@dnd-mapp/shared/ui';

@Component({
    selector: 'dma-log-in',
    templateUrl: './log-in.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class]': `'h-full block'`,
    },
    imports: [ReactiveFormsModule, ButtonComponent, InputComponent, AnchorComponent],
})
export class LogInPage {
    private readonly formBuilder = inject(FormBuilder);

    protected readonly loginForm = this.formBuilder.group({
        username: this.formBuilder.nonNullable.control('', [Validators.required]),
        password: this.formBuilder.nonNullable.control('', [Validators.required]),
    });

    protected onLogIn() {
        console.warn({ loginForm: this.loginForm.value });
    }
}
