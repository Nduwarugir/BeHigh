import { Routes } from '@angular/router';
import { LoadingGuard } from './shared/guards/loading.guard';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
		canActivate: [ LoadingGuard ] // Apply the guard to this route
    },{
        path: 'loading',
        loadComponent: () => import('./shared/components/loading/loading.page').then( m => m.LoadingPage)
    },{
		path: 'preview',
		loadComponent: () => import('./tab2/preview/preview.page').then( m => m.PreviewPage)
	},{
		path: 'video-popup',
		loadComponent: () => import('./shared/components/video-popup/video-popup.page').then( m => m.VideoPopupPage)
	},
];
