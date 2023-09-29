import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IAnim } from 'src/app/model/amin';
import { IFont } from 'src/app/model/font';
import { IScenario } from 'src/app/model/scenario';

@Component({
    selector: 'app-text',
    templateUrl: './text.page.html',
    styleUrls: ['./text.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class TextPage implements OnInit {

    @Input() nScript!: number;
    @Input() scenario!: IScenario;

    @Output() newScenarioEvent = new EventEmitter<IScenario>();

    fonts: IFont[] = []; anims: IAnim[] = [];
    form! : FormGroup;

    ngOnInit(): void {
        this.read();
        this.load();
    }

    //On verifie que chaque champ soit remplir
    constructor(private fb : FormBuilder){
        this.form= this.fb.group({
            text:['', Validators.required],
            ffamily:['', Validators.required],
            size:['12', Validators.required],
            fcolor:['#ff0000', Validators.required],
            bcolor:['#0000ff', Validators.required],
            animation:['', Validators.required],
            timing:['00', Validators.required]
        });
    }

    //Les getters
    get text(){
        return this.form.get('text');
    }

    get ffamily(){
        return this.form.get('ffamily');
    }

    get size(){
        return this.form.get('fcolor');
    }

    get fcolor(){
        return this.form.get('fcolor');
    }
    get bcolor(){
        return this.form.get('bcolor');
    }
    get animation(){
        return this.form.get('animation');
    }

    get timing(){
        return this.form.get('timing');
    }

    submit() {

        if (this.form.valid) {

            let scenario: IScenario = {
                type: 'Text',
                timing: Number(this.form.value.timing),
                text: this.form.value.text,
                ffamily: this.form.value.ffamily,
                size: Number(this.form.value.size),
                fcolor: this.form.value.fcolor.replace('#', ''),
                bcolor: this.form.value.bcolor.replace('#', ''),
                animation: this.form.value.animation,
                link: ''
            };
            setTimeout(() => {
                this.addScenario(scenario);
            }, 1000);
        }

    }

    addScenario(scenario: IScenario) {
        this.newScenarioEvent.emit(scenario);
    }

    load() {

        if (this.scenario != undefined) {
            if ( this.scenario.type == 'Texte') {
                this.form.patchValue({
                    text: this.scenario.text,
                    ffamily: this.scenario.ffamily,
                    size: this.scenario.size,
                    fcolor: '#'+this.scenario.fcolor,
                    bcolor: '#'+this.scenario.bcolor,
                    animation: this.scenario.animation,
                    timing: this.scenario.timing.toString().padStart(2, '0')
                });
            }
        }
    }

    read(): void {

        // fetch('assets/json/font.json')
        fetch('http://192.168.1.117/jsonFiles/font.json')
        // fetch('http://10.1.1.1/jsonFiles/font.json')
            .then(response => response.json())
            .then(data => {
                // use the 'data' variable which contains the parsed JSON data
                this.fonts = data;
                console.log("Fonts: ", this.fonts);
            })
            .catch(error => {
                // handle any errors that occur during the fetch request
                console.error(error);
        });

        // fetch('assets/json/animation.json')
        fetch('http://192.168.1.117/jsonFiles/animation.json')
        // fetch('http://10.1.1.1/jsonFiles/animation.json')
            .then(response => response.json())
            .then(data => {
                // use the 'data' variable which contains the parsed JSON data
                this.anims = data;
                console.log("Animations: ", this.anims);
            })
            .catch(error => {
                // handle any errors that occur during the fetch request
                console.error(error);
        });

    }

    range(f: number, l: number): string[] {
        const array: string[] = [];

        for (let i = f; i <= l; i++) {
            array.push(i.toString().padStart(2, '0'))
        }
        return array;
    }

}
