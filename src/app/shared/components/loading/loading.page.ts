import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Network } from '@capacitor/network';
import { GlobalsVariables } from '../../globals-variables';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.page.html',
  styleUrls: ['./loading.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoadingPage implements OnInit {

	timeOn: boolean = false;
	timeOut: boolean = false;
	timeTry: number = 0;
	onlineIps: { ip: string, name: string, version: string }[] = [];
	max: boolean = false;

	constructor(private param: GlobalsVariables, private alertController: AlertController, private loadingController: LoadingController, private httpClient: HttpClient, private router: Router) { }

    ngOnInit() {
		
		Network.addListener('networkStatusChange', status => {
			this.param.status = status;

			if (status.connected) {
				this.timeOut = false;
				this.timeOn = false;
				if(this.param.picoIp) {
					//this.hideLoadingPage()
				} else this.refresh();
			} else {
				this.showLoadingPage();
				this.refresh();
			}
			console.log('Network status changed', status);
		});
		
		const logCurrentNetworkStatus = async () => {
			const status = await Network.getStatus();
			this.param.status = status;
			this.scanNetwork();
			console.log('Network status:', status);
		};
		logCurrentNetworkStatus();
		this.trySet();
	}

	trySet() {

		let timeoutId: any;

		timeoutId = setInterval(() => {
			if (this.param.status.connected) {
				this.timeTry++;
				if (this.onlineIps.length > 0) this.timeOn = true;
				if (this.timeTry >= 5) {
					if (this.max) {
						clearTimeout(timeoutId);
					}
					this.timeOut = true;
					clearTimeout(timeoutId);
				}
				console.log(':', this.timeTry);
			} else this.timeOut = true;
		}, 3*1000);

	}

	setIp(ip: string) {
		this.param.picoIp = ip;
		this.presentLoading();
		setTimeout(() => {
			this.hideLoadingPage();
		}, 2*1000);
	}

	refresh() {

		if (!this.param.status.connected) {
			this.showPopupError('Network unavaillable... Please connect your device and retry')
		} else {
		
			this.trySet();
			this.timeOut = false;
			this.timeOn = false;
			this.timeTry = 0;
			this.onlineIps = [];
			this.scanNetwork();
		
		}
	}

	async presentLoading() {
		const loading = await this.loadingController.create({
			// message: 'Loading...', // Optional, the message to display
			duration: 4000 // Optional, the duration in milliseconds after which to automatically dismiss the loading overlay
		});
	  
		await loading.present();
	}

    async showPopupError(message: string) {
        const alert = await this.alertController.create({
            header: 'Check your connection',
            message: message,
            buttons: [{
				text: 'Retry',
                cssClass: 'alert-button-confirm',
                handler: () => {
					this.refresh();
                }
			}],
            cssClass: 'custom-alert'
        });
        await alert.present();
    }
   
	showLoadingPage() {
		this.router.navigate(['/loading']);
	}
	
	scanNetwork() {
		
		this.httpClient.get('http://10.1.1.1/admin/generalvalues').subscribe({
			next: (data:any) => {
				let fields: string[] = data.split('|');
			},
			error: err => {
				if (err.statusText === 'OK') {
					let fields: string[] = err.error.text.split('|');
					console.info('fields: ', fields);
					if (fields[0] === "devicename") {
						this.onlineIps.push({
							ip: '10.1.1.1',
							name: fields[1],
							version: fields[0]
						});
						this.max = true;
						this.timeOn = true;
					}
				}
			}
		});
		
		this.wait(500);
		
		if (this.onlineIps.length > 0) this.timeOn = true;
		else {
			
			this.max = false;
			let ip = '192.168.1.255'; let i = 0;

			let timeoutId: any;
		
			timeoutId = setInterval(() => {
				const element: string[] = ip.split('.');
				element.pop();
				element.push(String(i));
				let ipTemp = element.join('.');
				this.searchIpAdress(ipTemp);
				i++;
				if (i >= 255) { this.max = true; clearTimeout(timeoutId)};
			}, 0.025*1000);
		}
	}
	
	async searchIpAdress(ipTemp: string) {

		this.httpClient.get('http://'+ipTemp+'/admin/generalvalues').subscribe({
			next: (data:any) => {
				let fields: string[] = data.split('|');
			},
			error: err => {
				if (err.statusText === 'OK') {
					let fields: string[] = err.error.text.split('|');
					console.info('fields: ', fields);
					if (fields[0] === "devicename") 
						this.onlineIps.push({
							ip: ipTemp,
							name: fields[1],
							version: fields[0]
						});
				}
			}
		});
	}

	hideLoadingPage() {
		this.router.navigate(['/tabs/tab1']);
	}
	
	wait(ms: number) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
}
