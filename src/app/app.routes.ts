import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
    },{
        path: 'loading',
        loadComponent: () => import('./shared/components/loading/loading.page').then( m => m.LoadingPage)
    }
];
