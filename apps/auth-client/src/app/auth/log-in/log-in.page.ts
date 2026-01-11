import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@dnd-mapp/auth/ui';
import {
    AnchorComponent,
    ButtonComponent,
    InputComponent,
    LeadingIconDirective,
    SoLockIconComponent,
    SoUserIconComponent,
} from '@dnd-mapp/shared/ui';

@Component({
    selector: 'dma-log-in',
    templateUrl: './log-in.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class]': `'h-full block'`,
    },
    imports: [
        ReactiveFormsModule,
        ButtonComponent,
        InputComponent,
        AnchorComponent,
        SoUserIconComponent,
        LeadingIconDirective,
        SoLockIconComponent,
    ],
})
export class LogInPage implements OnInit {
    private readonly formBuilder = inject(FormBuilder);
    private readonly destroyRef = inject(DestroyRef);
    private readonly route = inject(ActivatedRoute);
    private readonly authService = inject(AuthService);

    protected readonly loginForm = this.formBuilder.group({
        username: this.formBuilder.nonNullable.control('', [Validators.required]),
        password: this.formBuilder.nonNullable.control('', [Validators.required]),
    });

    /**
     * The `state` parameter received from the server for this login session.
     * @private
     */
    private loginChallenge: string;

    public ngOnInit() {
        this.getStateFromRoute();
    }

    protected onLogIn() {
        const { username, password } = this.loginForm.value;

        this.authService
            .login({ username: username!, password: password!, loginChallenge: this.loginChallenge })
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: ({ url }) => this.redirect(url),
            });
    }

    private redirect(url: string) {
        location.href = url;
    }

    private getStateFromRoute() {
        const queryParams = this.route.snapshot.queryParamMap;

        if (!queryParams.has('loginChallenge')) return;
        this.loginChallenge = queryParams.get('loginChallenge')!;
    }
}
