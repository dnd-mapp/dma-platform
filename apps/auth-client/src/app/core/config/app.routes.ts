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
        path: '**',
        redirectTo: 'not-found',
    },
];
