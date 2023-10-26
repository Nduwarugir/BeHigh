import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalsVariables } from '../globals-variables';
import { LoadingController } from '@ionic/angular';

@Injectable({
  	providedIn: 'root'
})
export class LoadingGuard implements CanActivate {

    constructor(private param: GlobalsVariables, private loadingController: LoadingController, private router: Router) {
    }

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		
		if (!this.param.picoIp) {
			this.presentLoading();
			this.router.navigate(['loading']);
			return false;
		}

		return true;
	}
  
	async presentLoading() {
		const loading = await this.loadingController.create({
			// message: `Loading...`, // Optional, the message to display
			duration: 3*1000 // Optional, the duration in milliseconds after which to automatically dismiss the loading overlay
		});
	  
		await loading.present();
	}

}
