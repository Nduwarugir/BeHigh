import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.page.html',
    styleUrls: ['./edit.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule]
})
export class EditPage implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
