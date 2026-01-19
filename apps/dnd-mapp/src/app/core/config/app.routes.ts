import { Routes } from '@angular/router';

export const appRoutes: Routes = [
    {
        path: '',
        loadComponent: async () => (await import('../home')).HomePage,
    },
    {
        path: 'not-found',
        loadComponent: async () => (await import('@dnd-mapp/shared-ui/pages/not-found')).NotFoundPage,
    },
    {
        path: '**',
        redirectTo: 'not-found',
    },
];
