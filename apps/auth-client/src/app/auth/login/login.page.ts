import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '@dnd-mapp/auth-ui';
import { ButtonComponent, PasswordInputComponent, UsernameInputComponent } from '@dnd-mapp/shared-ui';
import { map, tap } from 'rxjs';

@Component({
    selector: 'dma-login',
    templateUrl: './login.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class]': `'flex h-full justify-center items-center'`,
    },
    imports: [ReactiveFormsModule, RouterLink, ButtonComponent, UsernameInputComponent, PasswordInputComponent],
})
export class LoginPage {
    private readonly formBuilder = inject(FormBuilder);
    private readonly destroyRef = inject(DestroyRef);
    private readonly authService = inject(AuthService);
    private readonly route = inject(ActivatedRoute);

    protected processing = signal(false);

    protected readonly loginForm = this.formBuilder.nonNullable.group({
        username: this.formBuilder.nonNullable.control('admin', [Validators.required]),
        password: this.formBuilder.nonNullable.control('changemenow', [Validators.required]),
    });

    protected onLogin() {
        const { username, password } = this.loginForm.getRawValue();
        const loginChallenge = this.route.snapshot.queryParamMap.get('loginChallenge');

        if (loginChallenge === null) throw new Error('LoginChallenge is missing');
        const { processing, request } = this.authService.login({
            username: username,
            password: password,
            loginChallenge: loginChallenge,
        });

        this.processing = processing;
        request
            .pipe(
                map((response) => response.body),
                tap((redirect) => {
                    if (!redirect) throw new Error('Failed to redirect back to client');
                    location.href = redirect.url;
                }),
                takeUntilDestroyed(this.destroyRef),
            )
            .subscribe();
    }
}
