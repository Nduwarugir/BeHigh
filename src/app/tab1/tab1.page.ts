import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ScenarioService } from '../services/scenario/scenario.service';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss'],
    standalone: true,
    imports: [IonicModule]
})
export class Tab1Page implements OnInit, OnChanges {

    constructor(private scenarioService: ScenarioService) {}


	ngOnInit(): void {
		// this.readHttp();
	}
	ngOnChanges(changes: SimpleChanges): void {
		console.log('changes: ', changes);
	}


    readHttp() {
        this.scenarioService.readScenario().subscribe({
			next: data => console.log("Datas: ", data),
			error: err => console.log("Error: ", err.error),
		})
    }
}
