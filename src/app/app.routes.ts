import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
    },{
        path: 'loading',
        loadComponent: () => import('./shared/components/loading/loading.page').then( m => m.LoadingPage)
    },
  {
    path: 'pre-visual',
    loadComponent: () => import('./tab2/pre-visual/pre-visual.page').then( m => m.PreVisualPage)
  },
  {
    path: 'video-popup',
    loadComponent: () => import('./shared/components/video-popup/video-popup.page').then( m => m.VideoPopupPage)
  }
];
