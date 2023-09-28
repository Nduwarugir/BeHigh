import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';

@Component({
    selector: 'app-system-settings',
    templateUrl: './system-settings.page.html',
    styleUrls: ['./system-settings.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class SystemSettingsPage implements OnInit {

    form!: FormGroup;

    constructor(private formBuilder: FormBuilder, private navCtrl: NavController) {
        this.form = this.formBuilder.group({
            login: ['', [Validators.required]],
            password: ['', [Validators.minLength(6), Validators.required]],
        });
    }

    ngOnInit() {
    }

    submit() {
        console.log('Method not implemented.');
    }

    restartESP() {
        console.log('Method not implemented.');
    }
}
