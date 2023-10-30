import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IonicModule, RangeCustomEvent } from '@ionic/angular';
import { ConnectionStatus, Network } from '@capacitor/network';
import { GlobalsVariables } from '../shared/globals-variables';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss'],
    standalone: true,
    imports: [IonicModule]
})
export class Tab1Page implements OnInit, OnChanges {

	status!: ConnectionStatus;

	constructor(private param: GlobalsVariables) { }

	ngOnInit(): void {

		// Network.addListener('networkStatusChange', status => {
		// 	this.status = status;
		// 	console.log('Network status changed', this.status);
		// });
		
		// const logCurrentNetworkStatus = async () => {
		// 	const status = await Network.getStatus();
		// 	this.status = status;
		// 	console.log('Network status:', this.status);
		// };
		// logCurrentNetworkStatus();
	}

	ngOnChanges(changes: SimpleChanges): void {
		console.log('changes: ', changes);
	}

    rangeChange(event: Event) {
        console.log(`rangeEvent() called: `, (event as RangeCustomEvent).detail.value);
    }

}
