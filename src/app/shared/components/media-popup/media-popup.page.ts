import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
	selector: 'app-media-popup',
	templateUrl: './media-popup.page.html',
	styleUrls: ['./media-popup.page.scss'],
	standalone: true,
	imports: [IonicModule, CommonModule, FormsModule]
})
export class MediaPopupPage implements OnInit {

	@Input() imageUrl!: string;

    constructor() { }

    ngOnInit() {
    }

}