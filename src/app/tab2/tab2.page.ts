import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { IScenario } from '../model/scenario';
import { CommonModule } from '@angular/common';
import { VideoPage } from "./video/video.page";
import { ImagePage } from "./image/image.page";
import { TextPage } from "./text/text.page";
import { EffetPage } from "./effet/effet.page";
import { ScenarioService } from '../services/scenario/scenario.service';

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

    ngOnInit(): void {
        this.read();
    }

    constructor(private scenarioService: ScenarioService) {}

    toggleView(i: number) {
        if (this.scenarios[i] != null) {
            this.toggleType(this.scenarios[i].type);
        } else {
            this.toggleType('null');
        }

        this._nScrip = i;
        console.log(i);
    }

	onSelectionChange(event: any, n: number) {
        this.toggleNScript(n);
        this.toggleType(event.detail.value);
	}
	  
    submit() {
        console.log("finalScénario: ", this.scenarios);

        if (this.scenarios.length < 1) {
            alert("Définissez au moins un scénario !");

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

            console.log(finalScenario);
            let formData = new FormData();
            formData.append("scenario", JSON.stringify(finalScenario, null, 4));

            this.scenarioService.sendConfiguration(formData).subscribe({
                next: response => {
                    console.log("Response: ", response);
                    alert("Scénario enregistré avec succès !");
                },
                error: err => {
                    console.log("Error: ", err.error);
                    alert("Scénario enregistré avec succès !");
                }
            })

        }

    }

    add(scenario: IScenario) {
        console.log("scenarioLength: ", this.scenariosLength);
        if (this.nScript < this.scenariosLength) {
            console.log(scenario);
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


    private _visual: boolean = false;

    get visual(){
        return this._visual;
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
                this.scenariosLength = this.scenarios.length;
                console.log("scenarioLength: ", this.scenariosLength);
                console.log("Scénario: ", this.scenarios);
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

}
