import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { IScenario } from '../model/scenario';
import { CommonModule } from '@angular/common';
import { VideoPage } from "./video/video.page";
import { ImagePage } from "./image/image.page";
import { TextPage } from "./text/text.page";
import { EffetPage } from "./effet/effet.page";

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, VideoPage, ImagePage, TextPage, EffetPage],
})
export class Tab2Page implements OnInit {

    _type: string = 'null';
    _active: number = -1;
    _nScrip: number = 0;
    _visibility: number = 0;
    errMsg!: string;
    scenarios: IScenario[] = []; scenariosLenght!: number;

    scripts!: string;

    ngOnInit(): void {
        this.read();

    }

    constructor() { }

    toggleView(i: number) {
        if (this.scenarios[i] != null) {
            this.toggleType(this.scenarios[i].type);
        } else {
            this.toggleType('null');
        }

        this._active = i;
        this._nScrip = i;
        console.log(i);
    }

    submit() {
        console.log("finalScénario: ", this.scenarios);

        if (this.scenarios.length < 1) {
            alert("Definissez au moins un scénario !");

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
            var xhr = new XMLHttpRequest();
            let formData = new FormData();
            formData.append("scenario", JSON.stringify(finalScenario, null, 4));
            xhr.open("POST", "http://192.168.1.117/valid", true);
            // xhr.open("POST", "http://10.1.1.1/valid", true);
            xhr.send(formData);

            alert("Scénario enregistré avec succès !");
        }

    }

    add(scenario: IScenario) {
        // if (this.nScript < this.scenariosLenght) {
        //     this.scenarios.splice(this.nScript, 1, scenario);
        // } else {
            // }
                this.scenarios.push(scenario);
        this.toggleView(this.nScript+1);
    }

    disabled() {
        return this.scenarios.length < 1;
    }


    private _visual: boolean = false;

    get visual(){
        return this._visual;
    }
/*
    visualisation() {
        this._visual = !this._visual;

        this.param.globalScenario.forEach(element => {
            console.log(element,element);

        });

    }

    clear() {
        this.param.clearScenario();
    }
*/

    //Les getters
    public get visibility(): number {
        return this._visibility
    }

    public set visibility(v : number) {
        this._visibility = v;
    }

    get type(): string {
        return this._type;
    }

    get nScript(): number {
        return this._nScrip;
    }

    toggleVisibility(n: number){
        this.visibility = n;
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

        // fetch('assets/json/scenario.json')
        fetch('http://192.168.1.117/jsonFiles/scenario.json')
        // fetch('http://10.1.1.1/jsonFiles/scenario.json')
            .then(response => response.json())
            .then(data => {
                // use the 'data' variable which contains the parsed JSON data
                this.scenarios = data;
                this.scenariosLenght = this.scenarios.length;
                console.log("Scenario Lenght: ", this.scenariosLenght);
                console.log("Scénario: ", this.scenarios);
            })
            .catch(error => {
                // handle any errors that occur during the fetch request
                console.error(error);
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

/*
    toggleView(i: number) {
        if (this._active !== -1) {
           this.add();
        }

        if (this.scenario[i] != null) {
            this.toggleType(i, this.scenario[i].type);
        } else {
            this.toggleType(i, 'null');
        }

        this._active = i;
        console.log(i);
    }

    toggleType(i: number, type: string) {

        this._type = type;
        this._active = i;
        this.setScriptView();
        // load(i)
        // setFileContent();
    }
*/
