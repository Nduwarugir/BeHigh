import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { IonicModule, PopoverController } from '@ionic/angular';
import { IFile } from 'src/app/model/file';
import { IScenario } from 'src/app/model/scenario';
import { ScenarioService } from 'src/app/services/scenario/scenario.service';
import { VideoPopupPage } from 'src/app/shared/components/video-popup/video-popup.page';
import { GlobalsVariables } from 'src/app/shared/globals-variables';

@Component({
  selector: 'app-video',
  templateUrl: './video.page.html',
  styleUrls: ['./video.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class VideoPage  implements OnInit, OnChanges {

    @Input() nScript!: number;
    @Input() scenario!: IScenario;

    @Output() newScenarioEvent = new EventEmitter<IScenario>();

    form! : FormGroup;
    selectedFile: File = <File>{};

    innerHTML!: string;
    vidFiles!: IFile[];

    ngOnInit(): void {
        this.load();
        this.read();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(changes) this.load();
    }

    //On verifie que chaque champ soit remplir
    constructor(private fb : FormBuilder, private scenarioService: ScenarioService, private param: GlobalsVariables, private popoverController: PopoverController, private httpClient: HttpClient){
        this.form= this.fb.group({
            link:['', Validators.required],
            timing:['00', Validators.required],
            type:['Video', Validators.nullValidator],
        });
    }

    submit() {

        if (this.form.valid) {

            let scenario: IScenario = {
                type: 'Video',
                timing: Number(this.form.value.timing),
                text: '',
                ffamily: '',
                size: 0,
                fcolor: 'p3',
                bcolor: 'p3',
                row: '',
                col: '',
                animation: '',
                link: this.form.value.link,
                speed: 0
            };

            setTimeout(() => {
                this.addScenario(scenario);
            }, 1000);
        }

    }

    async presentVideoPopover(ev: any) {

		const videoUrl = `http://${this.param.picoIp}/Videos/${this.form.value.link}`; // Replace with the actual URL of the video
		let arrayBuffer: any;

		this.httpClient.get(videoUrl, { responseType: 'blob' }).subscribe(
			(response: Blob) => {
			  // Process the video data
				arrayBuffer = response;
				console.log('video raw: ', response);
			  // Store the video blob in a variable or use it as needed
			},
			err => {
				console.log('err: ', err.error);
			  // Handle any errors that occur during the HTTP request
		});

		const blob = new Blob([arrayBuffer], { type: 'video/raw' });
		const dataUrl = URL.createObjectURL(blob);

        const popover = await this.popoverController.create({
            component: VideoPopupPage,
            componentProps: {
                vidUrl: dataUrl
            },
            translucent: true,
            event: ev,
            cssClass: 'my-popover-class custom-alert'
        });
        return await popover.present();
    }

    addScenario(scenario: IScenario) {
        this.newScenarioEvent.emit(scenario);
    }

    load() {

        if (this.scenario != undefined) {
            if ( this.scenario.type == 'Video') {
                this.form.patchValue({
                    link: this.scenario.link,
                    timing: this.scenario.timing.toString().padStart(2, '0')
                })
            }
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
        //innerHTML = '<video src="/Videos/'+ document.getElementById('link').value +'" width="100%" height="480" title="'+ document.getElementById('link').value +'" controls autoplay></video>';
    }
    read(): void {

        this.scenarioService.readFile('videos.json').subscribe({
			next: data => {
                this.vidFiles = data;
            },
			error: err => console.log("Error: ", err.error)
		});

    }

}
