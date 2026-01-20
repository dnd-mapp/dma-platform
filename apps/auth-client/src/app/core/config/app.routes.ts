import { Routes } from '@angular/router';

export const appRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'log-in',
    },
    {
        path: 'log-in',
        loadComponent: async () => (await import('../../auth/log-in')).LogInPage,
    },
    {
        path: 'not-found',
        loadComponent: async () => (await import('@dnd-mapp/shared-ui/pages/not-found')).NotFoundPage,
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
