import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonicModule } from '@ionic/angular';
import { IScenario } from '../model/scenario';
import { CommonModule } from '@angular/common';
import { VideoPage } from "./video/video.page";
import { ImagePage } from "./image/image.page";
import { TextPage } from "./text/text.page";
import { EffetPage } from "./effet/effet.page";
import { ScenarioService } from '../services/scenario/scenario.service';
import { GlobalsVariables } from "../shared/globals-variables";

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, VideoPage, ImagePage, TextPage, EffetPage],
})
export class Tab2Page implements OnInit {

    _type: string = 'null';
    _nScrip: number = -1;
    errMsg!: string;
    scenarios: IScenario[] = []; scenariosLength!: number;

    constructor(private alertController: AlertController, private scenarioService: ScenarioService, private param: GlobalsVariables, private router: Router) {}

    ngOnInit(): void {
        this.read();
    }

    ionViewDidEnter() {
        this.read();
    }

    toggleView(i: number) {
        if (this.scenarios[i] != null) {
            this.toggleType(this.scenarios[i].type);
        } else {
            this.toggleType('null');
        }

        this._nScrip = i;
    }

	onSelectionChange(event: any, n: number) {
        if (event.detail.value === 'null') {
            this.add({
                type: 'null',
                timing: 0,
                text: '',
                ffamily: '',
                size: 0,
                fcolor: 'p3',
                bcolor: 'p3',
                row: '',
                col: '',
                animation: '',
                link: ''
            });
        }
        this.toggleNScript(n);
        this.toggleType(event.detail.value);
	}

    clear() {
        this.scenarios = [];
	}

    visual() {
		this.router.navigate(['/tabs/preview']);
    }

    submit() {

        if (this.scenarios.length < 1) {
            this.showPopupAlert("Définissez au moins un scénario !");

        } else {

            let finalScenario: any[] = [];

            this.scenarios.forEach( elmt => {
                if (elmt != null) {
                    if(elmt.type === 'Texte'){
                        finalScenario.push({
                            text: elmt.text,
                            ffamily: elmt.ffamily,
                            size: elmt.size,
                            fcolor: elmt.fcolor,
                            bcolor: elmt.bcolor,
						    row: elmt.row,
						    col: elmt.col,
                            animation: elmt.animation,
                            timing: elmt.timing,
                            type: 'Texte'
                        });
                    } else if(elmt.type === 'Video'){
                        finalScenario.push({
                            link: elmt.link,
                            timing: elmt.timing,
                            type: 'Video'
                        });
                    } else if(elmt.type === 'Effet'){
                        finalScenario.push({
                            link: elmt.link,
                            timing: elmt.timing,
                            type: 'Effet'
                        });
                    } else if(elmt.type === 'Image'){
                        finalScenario.push({
                            link: elmt.link,
                            timing: elmt.timing,
                            type: 'Image'
                        });
                    }
                }
            });

            let formData = new FormData();
            formData.append("scenario", JSON.stringify(finalScenario, null, 4));

            this.scenarioService.sendConfiguration(formData).subscribe({
                next: response => {
                    console.log("Response: ", response);
                    setTimeout(() => {
                        this.showPopup("Scénario enregistré avec succès !");
                    }, 1000);
                },
                error: err => {
                    if (err.statusText !== 'OK') {
                        console.log("Error: ", err.error);
                        setTimeout(() => {
                            this.showPopup("Error! Pleae try aigain...");
                        }, 1000);
                    } else {
                        this.read();
                        setTimeout(() => {
                            this.showPopup("Scénario enregistré avec succès !");
                        }, 1000);
                    }
                }
            })

        }

    }

    add(scenario: IScenario) {
        if (this.nScript < this.scenariosLength) {
            this.scenarios.splice(this.nScript, 1, scenario);
        } else {
            this.scenarios.push(scenario);
        }
        // this.scenarios.push(scenario);
        this.toggleView(this.nScript+1);
    }

    disabled() {
        return this.scenarios.length < 1;
    }

    //Les getters
    get type(): string {
        return this._type;
    }

    get nScript(): number {
        return this._nScrip;
    }

    toggleType(t: string){
        this._type = t;
        switch (this.nScript) {
            case 0:
                break;

            default:
                break;
        }
    }

    toggleNScript(n: number){
        this._nScrip = n;
    }

    read(): void {

        this.scenarioService.readScenario().subscribe({
			next: data => {
                this.scenarios = data;
                console.log(data);
                this.scenariosLength = this.scenarios.length;
            },
			error: err => console.log("Error: ", err.error)
		});

    }

    range(start: number, end: number) {
        let range64: number[] = [];
        for (let i = start; i <= end; i++) {
            range64.push(i);
        }
        return range64;
    }

    async showPopup(message: string) {
        const alert = await this.alertController.create({
            header: 'Opération réussie.',
            message: message,
            buttons: ['OK'],
            cssClass: 'custom-alert'
        });
        await alert.present();
    }

    async showPopupAlert(message: string) {
        const alert = await this.alertController.create({
            header: 'Alert !!!',
            message: message,
            buttons: ['OK'],
            cssClass: 'custom-alert'
        });
        await alert.present();
    }

}
