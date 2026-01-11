import { Routes } from '@angular/router';

export const appRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
    },
    {
        path: 'forgot-password',
        loadComponent: async () => (await import('../../auth/forgot-password')).ForgotPasswordPage,
    },
    {
        path: 'login',
        loadComponent: async () => (await import('../../auth/log-in')).LogInPage,
    },
    {
        path: 'not-found',
        loadComponent: async () => (await import('@dnd-mapp/shared/ui/pages/not-found')).NotFoundPage,
    },
    {
        path: 'profile',
        loadComponent: async () => (await import('../../auth/profile')).ProfilePage,
    },
    {
        path: 'reset-password',
        loadComponent: async () => (await import('../../auth/reset-password')).ResetPasswordPage,
    },
    {
        path: 'sign-up',
        loadComponent: async () => (await import('../../auth/sign-up')).SignUpPage,
    },
    {
        path: '**',
        redirectTo: 'not-found',
    },
];
