import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IFile } from 'src/app/model/file';
import { ScenarioService } from 'src/app/services/scenario/scenario.service';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.page.html',
    styleUrls: ['./edit.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule]
})
export class EditPage implements OnInit, AfterViewInit {

    mode!: string;
    type!: string;
    visibility!: number
    currentDirContents!: IFile[];

    constructor(private scenarioService: ScenarioService) { }

    ngAfterViewInit(): void {
    }

    ngOnInit() {
        this.currentDirContents = [];
    }

    toggleMode(mode: string, visibility: number) {
        this.mode = mode;
        this.visibility = visibility;
        if(this.type) this.readDirContents();
    }

    toggleType(type: string) {
        this.type = type;
        if(this.mode && this.mode ==='delete') this.readDirContents();
    }

    readDirContents() {
    	if(this.type === 'Image')
		    this.scenarioService.readFile('images.json').subscribe({
				next: data => {
		            this.currentDirContents = data;
		            console.log("Effets: ", this.currentDirContents);
		        },
				error: err => console.log("Error: ", err.error)
			});
		else if(this.type === 'Video')
		    this.scenarioService.readFile('videos.json').subscribe({
				next: data => {
		            this.currentDirContents = data;
		            console.log("Effets: ", this.currentDirContents);
		        },
				error: err => console.log("Error: ", err.error)
			});
		else 
		    this.scenarioService.readFile('effets.json').subscribe({
				next: data => {
		            this.currentDirContents = data;
		            console.log("Effets: ", this.currentDirContents);
		        },
				error: err => console.log("Error: ", err.error)
			});

    }

    delete(fileName: string) {
        console.log('fileName: ', fileName);
    }

    edit(fileName: string) {
        console.log('fileName: ', fileName);
    }

}

// xmlHttp.open("DELETE", "/edit"); for deletion

// xmlHttp.open("POST", "/edit"); for uploding