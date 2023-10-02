import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IFile } from 'src/app/model/file';
import { IScenario } from 'src/app/model/scenario';
import { ScenarioService } from 'src/app/services/scenario/scenario.service';

@Component({
  selector: 'app-effet',
  templateUrl: './effet.page.html',
  styleUrls: ['./effet.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class EffetPage implements OnInit, OnChanges {

    @Input() nScript!: number;
    @Input() scenario!: IScenario;

    @Output() newScenarioEvent = new EventEmitter<IScenario>();

    form! : FormGroup;

    effFiles!: IFile[];

    ngOnInit(): void {
        this.load();
        this.read();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(changes) this.load();
    }

    //On vérifie que chaque champ soit remplir
    constructor(private fb : FormBuilder, private scenarioService: ScenarioService){
        this.form= this.fb.group({
            link:['', Validators.required],
            timing:['00', Validators.required]
        });
    }

    submit() {

        if (this.form.valid) {

            let scenario: IScenario = {
                type: 'Effet',
                timing: Number(this.form.value.timing),
                text: '',
                ffamily: '',
                size: 0,
                fcolor: 'p3',
                bcolor: 'p3',
                animation: '',
                link: this.form.value.link
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
            if ( this.scenario.type == 'Effet') {
                this.form.patchValue({
                    link: this.scenario.link,
                    timing: this.scenario.timing.toString().padStart(2, '0')
                })
            }
        }
        else { console.log('undefined');
        }

    }

    range(f: number, l: number): string[] {
        const array: string[] = [];

        for (let i = f; i <= l; i++) {
            array.push(i.toString().padStart(2, '0'))
        }
        return array;
    }

    setFileContent() {

        console.log('video');
        //innerHTML = '<video src="/Videos/'+ document.getElementById('link').value +'" width="100%" height="480" title="'+ document.getElementById('link').value +'" controls autoplay></video>';

    }

    read(): void {

        this.scenarioService.readFile('effets.json').subscribe({
			next: data => {
                this.effFiles = data;
                console.log("Effets: ", this.effFiles);
            },
			error: err => console.log("Error: ", err.error)
		});

    }

}
