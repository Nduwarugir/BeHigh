import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, PopoverController } from '@ionic/angular';
import { IFile } from 'src/app/model/file';
import { IScenario } from 'src/app/model/scenario';
import { ScenarioService } from 'src/app/services/scenario/scenario.service';
import { MediaPopupPage } from 'src/app/shared/components/media-popup/media-popup.page';
import { GlobalsVariables } from 'src/app/shared/globals-variables';

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
    constructor(private fb : FormBuilder, private scenarioService: ScenarioService, private param: GlobalsVariables, private popoverController: PopoverController){
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
                row: '',
                col: '',
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

    }

    async presentImagePopover(ev: any) {
        const popover = await this.popoverController.create({
            component: MediaPopupPage,
            componentProps: {
                imageUrl: `http://${this.param.picoIp}/Effets/${this.form.value.link}`
            },
            translucent: true,
            event: ev,
            cssClass: 'my-popover-class custom-alert'
        });
        return await popover.present();
    }
      
    range(f: number, l: number): string[] {
        const array: string[] = [];

        for (let i = f; i <= l; i++) {
            array.push(i.toString().padStart(2, '0'))
        }
        return array;
    }

    read(): void {

        this.scenarioService.readFile('effets.json').subscribe({
			next: data => {
                this.effFiles = data;
            },
			error: err => console.log("Error: ", err.error)
		});

    }

}
