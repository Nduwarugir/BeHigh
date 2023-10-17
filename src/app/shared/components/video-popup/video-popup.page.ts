import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
	selector: 'app-video-popup',
	templateUrl: './video-popup.page.html',
	styleUrls: ['./video-popup.page.scss'],
	standalone: true,
	imports: [IonicModule, CommonModule, FormsModule]
})
export class VideoPopupPage implements OnInit {

	@Input() vidUrl!: string;

    constructor() { }

    ngOnInit() {
    }

}
