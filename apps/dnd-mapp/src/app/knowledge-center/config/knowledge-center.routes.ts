import { Routes } from '@angular/router';

export const knowledgeCenterRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'game-mechanics',
    },
    {
        path: 'game-mechanics',
        loadComponent: async () => (await import('../game-mechanics')).GameMechanicsPage,
    },
];
